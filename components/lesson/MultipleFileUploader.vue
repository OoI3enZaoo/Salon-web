<template>

<div>
        <form role="form" enctype="multipart/form-data" @submit.prevent="onSubmit">
          <br>

          <v-card>
                <div class="uploadBox">
                    <v-card-text>
                  <div class="uploadBoxMain" v-if="!itemsAdded">
                      <div class="form-group">
                          <div class="dropArea" @ondragover="onChange">
                              <input type="file" id="items" name="items[]" multiple @change="onChange">
                              <p class="help-block">วางไฟล์วีดีโอของคุณที่นี่</p>
                          </div>
                      </div>
                  </div>
                  <div class="uploadBoxMain" v-else>
                      <span><strong>ชื่อไฟล์</strong></span>
                      <ol>
                          <li v-for="name in itemsNames">{{name}}</li>
                      </ol><br>
                      <span><strong>ขนาดไฟล์</strong></span>
                      <ol>
                          <li v-for="size in itemsSizes">{{size}}</li>
                      </ol>
                      <br>
                      <span><strong>จำนวนไฟล์ทั้งหมด:</strong> {{itemsAdded}}</span><br>
                      <span><strong>ขนาดไฟล์ทั้งหมด:</strong> {{itemsTotalSize}}</span><br>

                      <!-- Loader -->
                      <div class="loader" v-if="isLoaderVisible">
                          <div class="loaderImg"></div>
                      </div>
                      <!-- End Loader -->
                  </div>
                  <br>
                  <div class="successMsg" v-if="successMsg !== ''"> อัพโหลดสำเร็จ
                    <ol>
                        <li v-for="name in itemsNames">{{name}}</li>
                    </ol>
                  </div>
                  <div class="errorMsg" v-if="errorMsg !== ''">An error has occurred:<br>{{errorMsg}}</div>
                  <div class="errorMsg" v-if="itemsAdded && itemsAdded < minItems">Minimum {{minItems}} files need to be added to uploader. Please remove the files and try again.</div>
                  <div class="errorMsg" v-if="itemsAdded && itemsAdded > maxItems">A maximum of {{maxItems}} files can be uploaded each time. Please remove the files and try again.</div>
                  <div v-show="itemsAdded" >
                    <v-btn outline primary @click.native="removeItems">เลือกไฟล์อัพโหลดใหม่</v-btn>
                  </div>
                </v-card-text>
                  </div>
              </v-card>
              <div class="text-xs-left mt-3">
                <v-btn primary type="submit"  :disabled="buttonStatus" class="btn btn-primary btn-black btn-round" >
                    บันทึก
                </v-btn>
              </div>

                  <!-- <button type="button" class="btn btn-default btn-round" @click="removeItems">Cancel</button> -->

              <!-- <v-btn @click.native="$emit('createcourse','noob')">show something</v-btn> -->
        </form>


  </div>
</template>

<script>
require('es6-promise').polyfill();
import axios from 'axios';

component: {axios}
export default {
    props: {
        minItems: {
            type: Number,
            default: 1
        },
        maxItems: {
            type: Number,
            default: 30
        },
        method: {
            type: String,
            default: 'post'
        },
        postMeta: {
            type: [String, Array, Object],
            default: ''
        },
        successMessagePath: {
            type: String
        },
        errorMessagePath: {
            type: String
        },
        buttonStatus: {
          type: Boolean
        }
    },

    /*
     * The component's data.
     */
    data() {
        return {
            items: [],
            itemsAdded: '',
            itemsNames: [],
            itemsSizes: [],
            itemsTotalSize: '',
            formData: '',
            successMsg: '',
            errorMsg: '',
            isLoaderVisible: false,
        }
    },

    methods: {
        // http://scratch99.com/web-development/javascript/convert-bytes-to-mb-kb/
        bytesToSize(bytes) {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return 'n/a';
            let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            if (i === 0) return bytes + ' ' + sizes[i];
            return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
        },
        onChange(e) {
          this.removeItems();
            this.successMsg = '';
            this.errorMsg = '';
            this.formData = new FormData();
            let files = e.target.files || e.dataTransfer.files;
            this.itemsAdded = files.length;
            let fileSizes = 0;
            for (let x in files) {
                if (!isNaN(x)) {
                    this.items = e.target.files[x] || e.dataTransfer.files[x];
                    this.itemsNames[x] = files[x].name;
                    this.itemsSizes[x] = this.bytesToSize(files[x].size);
                    fileSizes += files[x].size;
                    this.formData.append('items[]', this.items);
                }
            }
            this.itemsTotalSize = this.bytesToSize(fileSizes);
        },

        removeItems() {
            this.items = '';
            this.itemsAdded = '';
            this.itemsNames = [];
            this.itemsSizes = [];
            this.itemsTotalSize = '';
        },
        onSubmit() {

          // this.$emit('createcourse','data')

            this.isLoaderVisible = true;
            if ((typeof this.postMeta === 'string' && this.postMeta !== '') ||
                (typeof this.postMeta === 'object' && Object.keys(this.postMeta).length > 0)) {
                this.formData.append('postMeta', this.postMeta);
            }
            if (this.method === 'put' || this.method === 'post' ) {
              let data = {
                method: this.method,
                data: this.formData,
                files: this.itemsNames
              }
              this.$emit('myupload', data)
              this.isLoaderVisible = false;
            } else {
                this.errorMsg = "This HTTP method is not allowed. Please use either 'put' or 'post' methods.";
                // this.removeItems();
            }
            this.removeItems()
        }
    }
}
</script>

<style>
.uploadBox {
    position: relative;
    background: #eee;
    padding: 0 ;
}


.uploadBox .uploadBoxMain {
    position: relative;
}

/* Drag and drop */
.uploadBox .dropArea {
    position: relative;
    width: 100%;
    height: 300px;
    border: 5px dashed #00ADCE;
    text-align: center;
    font-size: 2em;
    padding-top: 80px;
}

.uploadBox .dropArea input {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
/* End drag and drop */

/* Loader */
.uploadBox .loader {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    opacity: 0.9;
}

.uploadBox .loaderImg {
    border: 9px solid #eee;
    border-top: 9px solid #00ADCE;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
/* End Loader */

.uploadBox .errorMsg {
    font-size: 2em;
    color: #a94442;
}

.uploadBox .successMsg {
    font-size: 2em;
    color: #3c763d;
}
</style>
