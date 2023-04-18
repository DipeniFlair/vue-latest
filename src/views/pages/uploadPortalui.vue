<template>
    <div class="card multipart temp" :class="{
        drag: this.$parent.isDragging,
        display_image: !this.$parent.canvasComponents,
        landScapeMultiPart: this.$parent.bindingType == 'Top',
    }">
        <div v-for="(index, i) in this.$parent.requiredPage + 2" :id="'multipart' + i" :key="i" :class="{
            drag: this.$parent.isDragging,
            display_image: this.$parent.multiPartArray.includes(i),
            invisible: i == 0 || i > this.$parent.requiredPage,
            //image_drop: i == this.$parent.isdisplay,
        }" class="imagePreviewWrapper draggable card" @dragover.prevent @drop="dragFinishMultipart(-1, i, $event)">
            <img  :src="this.$parent.externalImage + this.$parent.previewImageArray[i]" alt="" :class="{
                noImage:this.$parent.previewImageArray[i]==undefined
            }">
            <div v-if="this.$parent.previewImageArray[i] != null" class="drop_button dropdown dropstart">
                <a href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-h"
                        aria-hidden="true"></i></a>
                <ul class="px-2 py-3 dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1"
                    data-bs-popper="none">
                    <li>
                        <a href="javascript:void(0)" class="dropdown-item border-radius-md"
                            @click="this.$parent.ShowCanvas(i, i)">PDFTool</a>
                    </li>
                </ul>
            </div>
            <p class="card-content">
                <strong>{{ i }}</strong>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: "Mutipartview",
    mounted() {
        var findImage = document.querySelector(".multipart.landScapeMultiPart:not(.multipartminiature) .imagePreviewWrapper:nth-child(2) img");
        var ele = findImage;
        
        var boxCoverImage = document.querySelectorAll(".multipart.landScapeMultiPart:not(.multipartminiature) .imagePreviewWrapper");
        if (ele) {
            var loaderDisplayPosition = document.body;
            this.mountLoader = this.$loading.show({
                container: loaderDisplayPosition,
            });
            var loaderCoverBox = document.querySelectorAll(".vld-container");
            ele.onload = function () {
                var eleHeight = ele.clientHeight;
                eleHeight = ele.height;
                
                if (eleHeight > 0) {
                    boxCoverImage.forEach(box => {
                        box.style.height = eleHeight + 'px';
                        box.style.maxHeight = '170px';
                        box.style.opacity = 1;
                    });
                }
                loaderCoverBox.forEach(el => el.remove());
            }
            // console.log("Check Next Ele", ele.parentElement.previousElementSibling.querySelector('img'));
            ele.onerror = function () {
                if (ele.parentElement.querySelector('img').classList.contains('noImage') == true) {
                    console.log("no Images loaded");
                    setTimeout(() => {
                        boxCoverImage.forEach(box => {
                            box.style.opacity = 1;
                        })
                        loaderCoverBox.forEach(el => el.remove());
                    }, 3500);
                }
            }
        }
        document.addEventListener("click", function () {
            if (ele) {
                var clickedHeight = ele.clientHeight;

                if (clickedHeight > 0 && boxCoverImage) {
                    boxCoverImage.forEach(box => {
                        box.style.height = clickedHeight + 'px';
                        box.style.opacity = 1;
                    });
                }
            }
        });
    },
    methods: {
        dragFinishMultipart(to, dropimageindex, ev) {
            var data = ev.dataTransfer.getData("Text");
            if (document.getElementById(data) != null) {
                this.$parent.isdisplay = dropimageindex;
                this.$parent.moveItem(this.$parent.dragging, to);
            }
        },
    },
};
</script>
<style scoped>
    .multipart.landScapeMultiPart:not(.multipartminiature) .imagePreviewWrapper:first-child,
    .multipart.landScapeMultiPart:not(.multipartminiature) .imagePreviewWrapper:nth-child(2) {
        opacity: 0;
    }
</style>