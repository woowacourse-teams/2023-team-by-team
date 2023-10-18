"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[205],{"./src/components/feed/DeletableThumbnail/DeletableThumbnail.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"feed/DeletableThumbnail",component:__webpack_require__("./src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx").Z,tags:["autodocs"],argTypes:{image:{description:"썸네일로 보여줄 이미지의 정보"},onDelete:{description:"썸네일에 해당하는 이미지를 삭제해야 할 때 실행될 함수"}},parameters:{docs:{description:{component:"`DeletableThumbnail` 은 이미지 업로드 서랍에서 사용할 수 있는 단일 이미지 썸네일 컴포넌트입니다. 삭제 버튼이 탑재되어 있습니다."}}}},Default={args:{image:{uuid:"5095f36c-076b-4e7f-a782-299412cb06e1",url:"https://images.unsplash.com/photo-1599169713100-120531cef331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"},onDelete:imageId=>{alert(`onDelete('${imageId}')`)}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    image: {\n      uuid: '5095f36c-076b-4e7f-a782-299412cb06e1',\n      url: 'https://images.unsplash.com/photo-1599169713100-120531cef331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'\n    },\n    onDelete: imageId => {\n      alert(`onDelete('${imageId}')`);\n    }\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/assets/png/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{WG:()=>feed_empty_image_namespaceObject,Rs:()=>link_empty_image_namespaceObject,Ok:()=>mouse_pointer_namespaceObject,Ep:()=>notice_thread_background_namespaceObject,wp:()=>thumbnail_fallback_image_namespaceObject});const notice_thread_background_namespaceObject=__webpack_require__.p+"static/media/notice-thread-background.48ca8103.png",link_empty_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/link-empty-image.5fc72217.png"),feed_empty_image_namespaceObject=__webpack_require__.p+"static/media/feed-empty-image.0ca39879.png",mouse_pointer_namespaceObject=__webpack_require__.p+"static/media/mouse-pointer.0c55151b.png",thumbnail_fallback_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/thumbnail-fallback-image.c23bee9d.png")},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.PRIMARY};
    color: ${({theme})=>theme.color.WHITE};
  `,normal:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.WHITE};
    color: ${({theme})=>theme.color.GRAY900};
    border: 1px solid ${({theme})=>theme.color.GRAY300};
  `,plain:styled_components_browser_esm.iv`
    background-color: transparent;
    color: ${({theme})=>theme.color.GRAY900};
  `},ButtonWrapper=styled_components_browser_esm.zo.button`
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
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),png=__webpack_require__("./src/assets/png/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const DeletableThumbnail=props=>{const{image,onDelete}=props,{uuid,url}=image;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Image,{src:url,alt:"미리보기 이미지",onError:e=>{e.currentTarget.src=png.wp,e.currentTarget.alt="손상된 이미지"}}),(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:deleteButton,onClick:()=>onDelete(uuid),"aria-label":`${url} 이미지 삭제하기`,children:(0,jsx_runtime.jsx)(svg.gH,{})})]})};DeletableThumbnail.displayName="DeletableThumbnail";const DeletableThumbnail_DeletableThumbnail=DeletableThumbnail;try{DeletableThumbnail.displayName="DeletableThumbnail",DeletableThumbnail.__docgenInfo={description:"",displayName:"DeletableThumbnail",props:{image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"PreviewImage"}},onDelete:{defaultValue:null,description:"",name:"onDelete",required:!0,type:{name:"(imageUuid: string) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx#DeletableThumbnail"]={docgenInfo:DeletableThumbnail.__docgenInfo,name:"DeletableThumbnail",path:"src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx#DeletableThumbnail"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-feed-DeletableThumbnail-DeletableThumbnail-stories.57848f5e.iframe.bundle.js.map