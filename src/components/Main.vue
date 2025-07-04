<!--
  - MIT License
  -
  - Copyright (c) 2023 JustAnyone
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  - copies of the Software, and to permit persons to whom the Software is
  - furnished to do so, subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  - IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  - FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  - AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  - LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  - OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  - SOFTWARE.
  -
  -->

<script setup lang="ts">

import {Ref, ref, UnwrapRef} from "vue";
import Button from "primevue/button";
import Select from "primevue/select"
import JSZip from "jszip";
import FileSaver from 'file-saver';

import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

import {Plugin} from "@/core/plugin/Plugin";
import {Types} from "@/core/Types";
import {DraftFactory} from '@/core/plugin/drafts/Draft';
import {PluginFile} from "@/core/PluginFile";
import Collapsable from "@/components/elements/core/Collapsable.vue";
import AttributeContainer from "@/components/elements/AttributeContainer.vue";


function capitalizeFirstLetter(string: string) {
  let first_letter = string.charAt(0)
  return first_letter.toUpperCase() + string.substring(1)
}

function getDisplayNameByTag(tag: string) {
  const draftType = Array.from(Types.getTypes()).find(type => type.tag === tag);
  return draftType?.displayName || capitalizeFirstLetter(tag);
}

const toast = useToast();


const zipFileUpload = ref(null);
const selectedDraftType = ref(null);
const showPreviewPanel = ref(NODE_ENV === "development");

const types = Array.from(Types.getTypes(), (draftType) => draftType.tag);

const version = __APP_VERSION__

function showErrorToast(summary: string, detail: string, life: number = 10000) {
  toast.add({
    severity: 'error',
    summary: summary,
    detail: detail,
    life: life
  })
}

function showWarningToast(summary: string, detail: string, life: number = 10000) {
  toast.add({
    severity: 'warn',
    summary: summary,
    detail: detail,
    life: life
  })
}

function addNewDraft() {
    if (selectedDraftType.value === null) {
      showErrorToast(
          "未指定草案类型",
          "请先选择草案类型再尝试添加"
      )
    } else {

      let draft = new DraftFactory().fromType(selectedDraftType.value, plugin.value)
      if (!plugin.value.manifest.author.isEmpty())
        draft.author.value = plugin.value.manifest.author.value

      plugin.value.addDraft(draft);
      selectedDraftType.value = null;
    }
}

const plugin: Ref<Plugin> = ref(null);
plugin.value = new Plugin();

function areDraftsValid() {
  // Validate drafts
  let isValid = true;
  plugin.value.drafts.forEach((draft) => {
    if (!draft.isValid()) isValid = false;
  });
  return isValid;
}

function exportToJson() {
  // Check that the drafts are defined
  if (plugin.value.drafts.length === 0)
    return showErrorToast(
        "无法导出空JSON",
        "导出JSON前请确保至少定义了一个草案。"
    )

  if (!areDraftsValid())
    return showErrorToast(
      "无法导出JSON",
      "请确保所有草案属性正确。"
    )

  FileSaver.saveAs(plugin.value.getJsonBlob(), "code.json")
}

function exportToManifest() {
  if (!plugin.value.isManifestValid())
    return showErrorToast(
      "无法导出清单文件",
      "请确保所有清单属性正确。"
    )

  FileSaver.saveAs(plugin.value.getManifestBlob(), "plugin.manifest")
}

function createZipArchive(): JSZip {
  const zip = new JSZip();
  zip.file("code.json", plugin.value.getJsonBlob())
  zip.file("plugin.manifest", plugin.value.getManifestBlob())

  Object.keys(plugin.value.fileMapping).forEach(key => {
    zip.file(key, plugin.value.fileMapping[key].raw)
  })
  return zip
}

function exportToZip() {
  if (plugin.value.drafts.length === 0)
    return showErrorToast(
        "无法导出空插件",
        "导出为归档文件前请确保至少定义了一个草案。"
    )


  if (!areDraftsValid() || !plugin.value.isManifestValid()) return showErrorToast(
      "无法导出归档文件",
      "请确保所有插件属性正确。"
  );

  createZipArchive().generateAsync({ type: 'blob' }).then(function (content) {
    FileSaver.saveAs(content, 'plugin.zip');
  });
}

function getFilename(path: string) {
  return path.split("/").pop()
}

async function loadFromZip(event) {

  if (event.files.length == 0) {
    return showErrorToast(
        "项目加载失败",
        "无法从非zip文件加载"
    );
  }

  let archive = new JSZip();
  plugin.value = new Plugin()

  let zip = await archive.loadAsync(event.files[0])

  const codeFile = zip.file("code.json")
  const manifestFile = zip.file("plugin.manifest")

  if (codeFile === null || manifestFile === null) {
    return showErrorToast(
        "项目加载失败",
        "所选zip不是PCA项目"
    );
  }


  // Load the manifest
  let manifestContent = await manifestFile.async("string")
  let jsonObject = JSON.parse(manifestContent);
  console.log(jsonObject)
  plugin.value.manifest.id.value = jsonObject["id"]
  plugin.value.manifest.version.value = jsonObject["version"]
  plugin.value.manifest.title.value = jsonObject["title"]
  plugin.value.manifest.text.value = jsonObject["text"]
  plugin.value.manifest.author.value = jsonObject["author"]



  // Load the code.json file
  let codeContent = await codeFile.async("string")
  jsonObject = JSON.parse(codeContent);

  if (!Array.isArray(jsonObject)) {
    return showErrorToast(
        "项目加载失败",
        "代码加载错误：不是数组格式"
    );
  }

  jsonObject.forEach((obj) => {
    const draft = new DraftFactory().fromJSON(obj, plugin.value);
    if (draft === null) {
      showWarningToast(
          "草案加载失败",
          "遇到不支持的草案类型: " + obj["type"] + " 对应 " + obj["id"]
      );
    } else {
      plugin.value.addDraft(draft)
    }
  })

  for (const fileKey in zip.files) {
    const file = zip.files[fileKey]
    // Ignore PCA files
    const fileName = getFilename(file.name)
    if (fileName === "code.json" || fileName === "plugin.manifest") {
      console.log("Ignoring " + file.name)
      continue
    }

    let data = await file.async("uint8array")
    plugin.value.addFile(
        file.name,
        new PluginFile(file.name, data)
    )
  }

  let alreadyVisited = {}
  let enumeratedFileUsages = plugin.value.enumerateFiles()
  enumeratedFileUsages.forEach(item => {
    if (alreadyVisited[item] !== true) {
      plugin.value.getFile(item).owners--;
      alreadyVisited[item] = true
    }
    plugin.value.addFile(item, null)
  });

  return true;
}

window.addEventListener('unhandledrejection', function(event) {
  alert("处理Promise时发生错误：" + JSON.stringify(event.reason))
  console.log(event.reason)
  //handle error here
  //event.promise contains the promise object
  //event.reason contains the reason for the rejection
});


window.onerror = function (msg, url, line, col, error) {
  alert("遇到意外错误：" + msg)
  //code to handle or report error goes here
}

</script>

<template>
  <Toast position="bottom-right" />

  <div class="page-container">

    <div class="main-content">

      <div class="generator-panel">
        <h2>Plugin Creator for TheoTown</h2>

        <div class="generator-header">

          <Collapsable title="Manifest">
            <p>
              要开始创建插件，请先创建插件的清单文件。清单文件帮助TheoTown通过图形界面识别和管理您的插件。
              您的插件也会显示在本地插件列表和插件工具栏中。
            </p>
            <p>
              如果您是插件开发新手，可以查看<a href="/docs/docs/getting-started/writing-a-sample-plugin.md">这里的文档</a>。
            </p>
            <AttributeContainer
                :attribute-owner="plugin.manifest"
            />
          </Collapsable>



          <p>
            完成清单编写后，您可以开始为插件添加草案。
          </p>
          <p>
            草案是指游戏中的插件对象，其功能由草案类型决定。
          </p>

          <!-- Type selector for new draft object -->
          <div class="type-selector">
            <Select
              style="width: 100%;"
              v-model="selectedDraftType"
              :options="types"
              filter  
              placeholder="选择草案类型"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                  <div>{{ getDisplayNameByTag(slotProps.value) }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ getDisplayNameByTag(slotProps.option) }}</div>
                </div>
              </template>
            </Select>
            <Button @click="addNewDraft">添加</Button>
          </div>
        </div>

        <div v-if="plugin.drafts.length > 0" class="drafts">
          <!--:title="`${(props.index + 1)}. ${props.draftObject.id.value ? props.draftObject.id.value : 'No ID specified'} (type: ${ props.draftObject.type.tag})`"-->
          <Collapsable
              v-for="(obj, index) in plugin.drafts"
              :title="`${(index + 1)}. ${obj.id.value ? obj.id.value : '未指定ID'} (类型: ${obj.type.tag})`"
              :removable="true"
              @pop="plugin.removeDraftAtIndex(index)"
              class="marginify"
          >
            <AttributeContainer
                :attribute-owner="obj"
            />
          </Collapsable>
        </div>


        <div class="controls">
          <p>
            现在您可以导出插件以便加载到游戏中。
            推荐导出为zip压缩包，这样您只需将单个文件放入游戏即可使用。
            它也可以作为PCA项目文件，让您可以从文件恢复项目。
            如需通过加密保护插件内容，请阅读
            <a href="https://pca.svetikas.lt/docs/guides/plugin-encryption/">这里的指南</a>。
          </p>
          <p>
            您也可以选择单独导出生成的JSON和清单文件。
          </p>

          <input
              ref="zipFileUpload"
              accept="application/zip"
              type="file"
              style="display:none;"
              @change="loadFromZip($event.target)"
          />
          <Button @click="zipFileUpload.click()">从zip加载</Button>
          <Button @click="exportToZip()">导出为zip压缩包</Button>
          <Button @click="exportToJson()">导出JSON文件</Button>
          <Button @click="exportToManifest()">导出plugin.manifest文件</Button>
        </div>


      </div>

      <div v-if="showPreviewPanel" class="preview-panel">
        <h2>文件：</h2>
        <pre>{{ plugin.fileMapping }}</pre>
        <h2>生成的JSON实时预览：</h2>
        <h3>plugin.manifest</h3>
        <pre>{{ plugin.manifest }}</pre>
        <h3>code.json</h3>
        <pre>{{ plugin.drafts }}</pre>
      </div>
    </div>

    <div class="footer">
      <a href="https://github.com/JustAnyones/Plugin-creator-website">
        &copy; Plugin creator website {{version}} by JustAnyone 2025
      </a>
    </div>
  </div>

</template>
<style scoped>
/*.page-container {
  display: flex;
  align-items: stretch;
}*/

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 99vh;
}

.main-content {
  display: flex;
  flex: 1;
}

.marginify {
  margin-bottom: 20px;
}

.generator-panel {
  flex: 5; /* Adjust the flex ratio for central panel size */
  display: flex;
  flex-direction: column;
  /*justify-content: space-between;*/
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.generator-header {
  margin-bottom: 20px;
}

.type-selector {
  display: flex;
  align-items: center;
}

.drafts {
  margin-bottom: 20px;
}

.controls {
  display: block;
  justify-content: stretch;
  margin-bottom: 20px;
}

.controls button {
  margin-bottom: 10px;
  margin-right: 10px;
}

.preview-panel {
  flex: 2;
  background-color: #f5f5f5;
  padding: 20px;
  border-left: 1px solid #ccc;
  overflow-x: auto;
}

.footer {
  margin-top: auto;
  text-align: center;
  background-color: #f5f5f5;
  color: #999;
  padding: 10px 0;
}

@media (max-width: 800px) {
  .page-container {
    flex-direction: column;
  }

  .main-content {
    flex-direction: column;
  }

  .generator-panel {
    flex: 1;
    border-right: none;
    margin-bottom: 20px;
  }

  .preview-panel {
    border: none;
    padding: 10px;
  }
}
</style>
