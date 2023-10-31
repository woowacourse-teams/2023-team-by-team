"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6317],{"./src/components/feed/ThumbnailList/ThumbnailList.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DeletableList:()=>DeletableList,EmptyDeletableList:()=>EmptyDeletableList,NotMaxDeletableList:()=>NotMaxDeletableList,ViewableList:()=>ViewableList,ViewableListSmall:()=>ViewableListSmall,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"feed/ThumbnailList",component:__webpack_require__("./src/components/feed/ThumbnailList/ThumbnailList.tsx").Z,tags:["autodocs"],argTypes:{mode:{description:"썸네일 리스트를 어떤 용도로 사용할 지를 정할 수 있습니다. `delete`일 경우 리스트의 이미지들을 삭제할 수 있으며, `view`일 경우 리스트의 썸네일을 클릭하여 모달에 이미지를 띄울 수 있습니다."},images:{description:"썸네일 리스트를 보여주기 위해 사용할 이미지들의 정보입니다."},onDelete:{description:"**`mode = 'delete'` 일때만 필요합니다.** 이미지가 클릭되었을 때 이미지를 지우는 함수를 의미합니다."},onClick:{description:"**`mode = 'view'` 일때만 필요합니다.** 이미지가 클릭되었을 때 모달을 띄우는 함수를 의미합니다."}},parameters:{docs:{description:{component:"`ThumbnailList` 은 이미지 서랍, 또는 채팅에서 사용할 수 있는 썸네일 모음집입니다."}}}},viewModeImages=[{id:9283,isExpired:!1,name:"neon.png",url:"https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"},{id:4165,isExpired:!1,name:"donut.png",url:"https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"},{id:8729,isExpired:!1,name:"zXwMd93Xwz2V03M5xAw_fVmxzEwNiDv_93-xVm__902XvC-2XzOqPdR93F3Xz_24RzV01IjSwmOkVeZmIoPlLliFmMVc2__s9Xz.png",url:"https://images.unsplash.com/photo-1591382386627-349b692688ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"},{id:1092,isExpired:!1,name:"icon.png",url:"https://img.icons8.com/?size=256&id=VUoFEYkLOaMn&format=png&color=1A6DFF,C822FF"},{id:3493,isExpired:!0,name:"만료된 사진",url:""}],DeletableList={args:{mode:"delete",images:[],onDelete:imageUuid=>{alert(`onDelete(${imageUuid});`)},onChange:()=>{alert("onChange()")},isUploading:!1}},NotMaxDeletableList={args:{mode:"delete",images:[{uuid:"69aaaf99-a02d-4800-a175-7314c64e2a84",url:"https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"},{uuid:"aaf9a0de-8289-455e-8112-37eebc42944a",url:"https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"},{uuid:"ac49b5ed-11f4-468b-b278-5880fcf7bf16",url:"https://images.unsplash.com/photo-1591382386627-349b692688ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"},{uuid:"3e658b3c-5664-4225-b94a-25e6cece4ac5",url:"https://img.icons8.com/?size=256&id=VUoFEYkLOaMn&format=png&color=1A6DFF,C822FF"}].slice(0,2),onDelete:imageUuid=>{alert(`onDelete(${imageUuid});`)},onChange:()=>{alert("onChange()")},isUploading:!1}},EmptyDeletableList={args:{mode:"delete",images:[],onDelete:imageUuid=>{alert(`onDelete(${imageUuid});`)},onChange:()=>{alert("onChange()")},isUploading:!1}},ViewableList={args:{mode:"view",images:viewModeImages,onClick:(images,selectedImage)=>{alert(`onClick(${JSON.stringify(images)}, ${selectedImage});`)}}},ViewableListSmall={args:{mode:"view",size:"sm",images:viewModeImages,onClick:(images,selectedImage)=>{alert(`onClick(${JSON.stringify(images)}, ${selectedImage});`)}}};DeletableList.parameters={...DeletableList.parameters,docs:{...DeletableList.parameters?.docs,source:{originalSource:"{\n  args: {\n    mode: 'delete',\n    images: [],\n    onDelete: imageUuid => {\n      alert(`onDelete(${imageUuid});`);\n    },\n    onChange: () => {\n      alert(`onChange()`);\n    },\n    isUploading: false\n  }\n}",...DeletableList.parameters?.docs?.source},description:{story:"이미지 서랍에 사용할 경우 이 옵션을 사용하세요. `mode = 'delete'` 로 설정하시면 됩니다.",...DeletableList.parameters?.docs?.description}}},NotMaxDeletableList.parameters={...NotMaxDeletableList.parameters,docs:{...NotMaxDeletableList.parameters?.docs,source:{originalSource:"{\n  args: {\n    mode: 'delete',\n    images: deleteModeImages.slice(0, 2),\n    onDelete: imageUuid => {\n      alert(`onDelete(${imageUuid});`);\n    },\n    onChange: () => {\n      alert(`onChange()`);\n    },\n    isUploading: false\n  }\n}",...NotMaxDeletableList.parameters?.docs?.source},description:{story:"`mode = delete`이고, 이미지 개수가 최대로 올릴 수 있는 이미지 개수를 넘지 않았다면, 이미지 추가 버튼이 보이게 됩니다.",...NotMaxDeletableList.parameters?.docs?.description}}},EmptyDeletableList.parameters={...EmptyDeletableList.parameters,docs:{...EmptyDeletableList.parameters?.docs,source:{originalSource:"{\n  args: {\n    mode: 'delete',\n    images: [],\n    onDelete: imageUuid => {\n      alert(`onDelete(${imageUuid});`);\n    },\n    onChange: () => {\n      alert(`onChange()`);\n    },\n    isUploading: false\n  }\n}",...EmptyDeletableList.parameters?.docs?.source}}},ViewableList.parameters={...ViewableList.parameters,docs:{...ViewableList.parameters?.docs,source:{originalSource:"{\n  args: {\n    mode: 'view',\n    images: viewModeImages,\n    onClick: (images: ThreadImage[], selectedImage: number) => {\n      alert(`onClick(${JSON.stringify(images)}, ${selectedImage});`);\n    }\n  }\n}",...ViewableList.parameters?.docs?.source},description:{story:"채팅 메시지에 사용할 경우 이 옵션을 사용하세요. `mode = 'view'` 로 설정하시면 됩니다.",...ViewableList.parameters?.docs?.description}}},ViewableListSmall.parameters={...ViewableListSmall.parameters,docs:{...ViewableListSmall.parameters?.docs,source:{originalSource:"{\n  args: {\n    mode: 'view',\n    size: 'sm',\n    images: viewModeImages,\n    onClick: (images: ThreadImage[], selectedImage: number) => {\n      alert(`onClick(${JSON.stringify(images)}, ${selectedImage});`);\n    }\n  }\n}",...ViewableListSmall.parameters?.docs?.source}}};const __namedExportsOrder=["DeletableList","NotMaxDeletableList","EmptyDeletableList","ViewableList","ViewableListSmall"];try{DeletableList.displayName="DeletableList",DeletableList.__docgenInfo={description:"이미지 서랍에 사용할 경우 이 옵션을 사용하세요. `mode = 'delete'` 로 설정하시면 됩니다.",displayName:"DeletableList",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ThumbnailList/ThumbnailList.stories.tsx#DeletableList"]={docgenInfo:DeletableList.__docgenInfo,name:"DeletableList",path:"src/components/feed/ThumbnailList/ThumbnailList.stories.tsx#DeletableList"})}catch(__react_docgen_typescript_loader_error){}try{NotMaxDeletableList.displayName="NotMaxDeletableList",NotMaxDeletableList.__docgenInfo={description:"`mode = delete`이고, 이미지 개수가 최대로 올릴 수 있는 이미지 개수를 넘지 않았다면, 이미지 추가 버튼이 보이게 됩니다.",displayName:"NotMaxDeletableList",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ThumbnailList/ThumbnailList.stories.tsx#NotMaxDeletableList"]={docgenInfo:NotMaxDeletableList.__docgenInfo,name:"NotMaxDeletableList",path:"src/components/feed/ThumbnailList/ThumbnailList.stories.tsx#NotMaxDeletableList"})}catch(__react_docgen_typescript_loader_error){}try{ViewableList.displayName="ViewableList",ViewableList.__docgenInfo={description:"채팅 메시지에 사용할 경우 이 옵션을 사용하세요. `mode = 'view'` 로 설정하시면 됩니다.",displayName:"ViewableList",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ThumbnailList/ThumbnailList.stories.tsx#ViewableList"]={docgenInfo:ViewableList.__docgenInfo,name:"ViewableList",path:"src/components/feed/ThumbnailList/ThumbnailList.stories.tsx#ViewableList"})}catch(__react_docgen_typescript_loader_error){}},"./src/assets/png/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{WG:()=>feed_empty_image_namespaceObject,Rs:()=>link_empty_image_namespaceObject,Ok:()=>mouse_pointer_namespaceObject,Ep:()=>notice_thread_background_namespaceObject,wp:()=>thumbnail_fallback_image_namespaceObject});const notice_thread_background_namespaceObject=__webpack_require__.p+"static/media/notice-thread-background.48ca8103.png",link_empty_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/link-empty-image.5fc72217.png"),feed_empty_image_namespaceObject=__webpack_require__.p+"static/media/feed-empty-image.0ca39879.png",mouse_pointer_namespaceObject=__webpack_require__.p+"static/media/mouse-pointer.0c55151b.png",thumbnail_fallback_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/thumbnail-fallback-image.c23bee9d.png")},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.PRIMARY};
    color: ${({theme})=>theme.color.WHITE};
  `,normal:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.WHITE};
    color: ${({theme})=>theme.color.GRAY900};
    border: 1px solid ${({theme})=>theme.color.GRAY300};
  `,plain:styled_components_browser_esm.iv`
    background-color: transparent;
    color: ${({theme})=>theme.color.GRAY900};
  `},ButtonWrapper=styled_components_browser_esm.zo.button.withConfig({shouldForwardProp:prop=>!["css","variant","size"].includes(prop)})`
  font-size: 16px;
  line-height: 16px;
  text-align: center;

  ${({size="md"})=>styled_components_browser_esm.iv`
      padding: ${paddingSize[size]};
    `};

  ${({variant="primary"})=>variants[variant]};

  ${({variant="primary"})=>{if("plain"!==variant)return styled_components_browser_esm.iv`
        &:disabled {
          opacity: 0.6;
        }

        &:not([disabled]):hover {
          opacity: 0.8;
        }

        border-radius: 4px;

        transition: 0.2s;
      `}};

  ${props=>props.css}
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>DeletableThumbnail_DeletableThumbnail});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.li`
  display: inline-block;
  flex-shrink: 0;
  position: relative;

  width: 96px;
  height: 96px;

  border-radius: 12px;
`,Image=styled_components_browser_esm.zo.img`
  width: 100%;
  height: 100%;

  border-radius: 12px;

  object-fit: cover;
`,deleteButton=styled_components_browser_esm.iv`
  position: absolute;
  top: -4px;
  right: -4px;

  width: 24px;
  height: 24px;
  padding: 0;

  border-radius: 4px;
  box-shadow: 0 3px 6px ${({theme})=>theme.color.GRAY400};
  background-color: ${({theme})=>theme.color.GRAY100};

  & svg {
    width: 18px;
    height: 18px;
  }
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),png=__webpack_require__("./src/assets/png/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const DeletableThumbnail=props=>{const{image,onDelete,isUploading}=props,{uuid,url}=image;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Image,{src:url,alt:"미리보기 이미지",onError:e=>{e.currentTarget.src=png.wp,e.currentTarget.alt="손상된 이미지"}}),!isUploading&&(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:deleteButton,onClick:()=>onDelete(uuid),"aria-label":`${url} 이미지 삭제하기`,children:(0,jsx_runtime.jsx)(svg.gH,{})})]})};DeletableThumbnail.displayName="DeletableThumbnail";const DeletableThumbnail_DeletableThumbnail=DeletableThumbnail;try{DeletableThumbnail.displayName="DeletableThumbnail",DeletableThumbnail.__docgenInfo={description:"",displayName:"DeletableThumbnail",props:{image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"PreviewImage"}},onDelete:{defaultValue:null,description:"",name:"onDelete",required:!0,type:{name:"(imageUuid: string) => void"}},isUploading:{defaultValue:null,description:"",name:"isUploading",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx#DeletableThumbnail"]={docgenInfo:DeletableThumbnail.__docgenInfo,name:"DeletableThumbnail",path:"src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx#DeletableThumbnail"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/ImageAddButton/ImageAddButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ImageAddButton_ImageAddButton});var svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const FakeButton=styled_components_browser_esm.zo.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 96px;
  height: 96px;

  border-radius: 12px;
  background-color: #dee1ff;

  transition: 0.2s;

  cursor: pointer;

  &:hover {
    background-color: #e8eaff;
  }

  & svg {
    color: #9792ff;
  }
`,FileUploadInput=styled_components_browser_esm.zo.input`
  display: none;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ImageAddButton=props=>{const{onChangeImage}=props;return(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsx)(FakeButton,{role:"button","aria-label":"이미지 추가",children:(0,jsx_runtime.jsx)(svg.pO,{})}),(0,jsx_runtime.jsx)(FileUploadInput,{type:"file",accept:"image/*",onChange:onChangeImage,multiple:!0})]})};ImageAddButton.displayName="ImageAddButton";const ImageAddButton_ImageAddButton=ImageAddButton;try{ImageAddButton.displayName="ImageAddButton",ImageAddButton.__docgenInfo={description:"",displayName:"ImageAddButton",props:{onChangeImage:{defaultValue:null,description:"",name:"onChangeImage",required:!0,type:{name:"(e: ChangeEvent<HTMLInputElement>) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ImageAddButton/ImageAddButton.tsx#ImageAddButton"]={docgenInfo:ImageAddButton.__docgenInfo,name:"ImageAddButton",path:"src/components/feed/ImageAddButton/ImageAddButton.tsx#ImageAddButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/ThumbnailList/ThumbnailList.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ThumbnailList_ThumbnailList});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.ul`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  column-gap: 12px;

  width: 100%;
  height: 116px;

  ${({$mode})=>"view"===$mode?styled_components_browser_esm.iv`
          overflow-x: auto;
          overflow-y: hidden;

          padding-bottom: 20px;
        `:styled_components_browser_esm.iv`
          overflow-x: visible;
        `}
`;var DeletableThumbnail=__webpack_require__("./src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx"),ViewableThumbnail=__webpack_require__("./src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx"),ImageAddButton=__webpack_require__("./src/components/feed/ImageAddButton/ImageAddButton.tsx"),feed=__webpack_require__("./src/constants/feed.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ThumbnailList=props=>{const{mode,images}=props;return(0,jsx_runtime.jsxs)(Container,{role:"list",$mode:mode,children:["delete"===mode?images.map((image=>(0,jsx_runtime.jsx)(DeletableThumbnail.Z,{image,onDelete:props.onDelete,isUploading:props.isUploading},image.uuid))):images.map(((image,index)=>(0,jsx_runtime.jsx)(ViewableThumbnail.Z,{image,size:props.size,onClick:()=>props.onClick(images,index+1)},image.id))),"delete"===mode&&images.length<feed.vO&&!props.isUploading&&(0,jsx_runtime.jsx)(ImageAddButton.Z,{onChangeImage:props.onChange})]})};ThumbnailList.displayName="ThumbnailList";const ThumbnailList_ThumbnailList=ThumbnailList;try{ThumbnailList.displayName="ThumbnailList",ThumbnailList.__docgenInfo={description:"",displayName:"ThumbnailList",props:{mode:{defaultValue:null,description:"",name:"mode",required:!0,type:{name:"enum",value:[{value:'"view"'},{value:'"delete"'}]}},images:{defaultValue:null,description:"",name:"images",required:!0,type:{name:"PreviewImage[] | ThreadImage[]"}},onDelete:{defaultValue:null,description:"",name:"onDelete",required:!0,type:{name:"(imageUuid: string) => void"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"ChangeEventHandler<HTMLInputElement>"}},isUploading:{defaultValue:null,description:"",name:"isUploading",required:!0,type:{name:"boolean"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"(images: ThreadImage[], selectedImage: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ThumbnailList/ThumbnailList.tsx#ThumbnailList"]={docgenInfo:ThumbnailList.__docgenInfo,name:"ThumbnailList",path:"src/components/feed/ThumbnailList/ThumbnailList.tsx#ThumbnailList"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ViewableThumbnail_ViewableThumbnail});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.li`
  flex-shrink: 0;

  width: ${({$size="md"})=>"md"===$size?"96px":"76px"};
  height: ${({$size="md"})=>"md"===$size?"96px":"76px"};

  border-radius: ${({$size="md"})=>"md"===$size?"12px":"10px"};
`,Image=styled_components_browser_esm.zo.img`
  width: 100%;
  height: 100%;

  border-radius: 12px;

  object-fit: cover;
`,viewButton=styled_components_browser_esm.iv`
  width: 100%;
  height: 100%;
  padding: 0;

  border-radius: 12px;
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),png=__webpack_require__("./src/assets/png/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ViewableThumbnail=props=>{const{image,size="md",onClick}=props,{isExpired,name,url}=image;return(0,jsx_runtime.jsx)(Container,{$size:size,children:(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:viewButton,onClick,"aria-label":`${name} 이미지 자세히 보기`,children:(0,jsx_runtime.jsx)(Image,{src:isExpired?png.wp:url,alt:name,onError:e=>{e.currentTarget.src=png.wp,e.currentTarget.alt="손상된 이미지"}})})})};ViewableThumbnail.displayName="ViewableThumbnail";const ViewableThumbnail_ViewableThumbnail=ViewableThumbnail;try{ViewableThumbnail.displayName="ViewableThumbnail",ViewableThumbnail.__docgenInfo={description:"",displayName:"ViewableThumbnail",props:{image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"ThreadImage"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx#ViewableThumbnail"]={docgenInfo:ViewableThumbnail.__docgenInfo,name:"ViewableThumbnail",path:"src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx#ViewableThumbnail"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/feed.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{KD:()=>THREAD_TYPE,Yz:()=>THREAD_SIZE,rW:()=>DEFAULT_MAX_THREAD_HEIGHT,vO:()=>MAX_UPLOAD_IMAGE_COUNT});const DEFAULT_MAX_THREAD_HEIGHT=500,THREAD_TYPE={THREAD:"thread",NOTIFICATION:"notification"},THREAD_SIZE=20,MAX_UPLOAD_IMAGE_COUNT=4}}]);
//# sourceMappingURL=components-feed-ThumbnailList-ThumbnailList-stories.3fd1dfa5.iframe.bundle.js.map