"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2338],{"./src/components/feed/ViewableThumbnail/ViewableThumbnail.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,ExpiredThumbnail:()=>ExpiredThumbnail,Small:()=>Small,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"feed/ViewableThumbnail",component:__webpack_require__("./src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx").Z,tags:["autodocs"],argTypes:{image:{description:"썸네일로 보여줄 이미지의 정보"},onClick:{description:"썸네일에 해당하는 이미지가 클릭되었을 때, 해당 썸네일을 이미지 모달에 띄우기 위한 함수"}},parameters:{docs:{description:{component:"`ViewableThumbnail` 은 이미지 업로드 서랍에서 사용할 수 있는 단일 이미지 썸네일 컴포넌트입니다. 이미지를 클릭할 경우 모달을 띄우기 위한 함수를 호출합니다."}}}},Default={args:{image:{id:2918,isExpired:!1,name:"rabbit.png",url:"https://images.unsplash.com/photo-1599169713100-120531cef331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"},onClick:()=>{alert("onClick()")}}},Small={args:{image:{id:1145,isExpired:!1,name:"rabbit.png",url:"https://images.unsplash.com/photo-1599169713100-120531cef331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"},size:"sm",onClick:()=>{alert("onClick()")}}},ExpiredThumbnail={args:{image:{id:1029,isExpired:!0,name:"만료된 이미지",url:""},onClick:()=>{alert("onClick()")}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    image: {\n      id: 2918,\n      isExpired: false,\n      name: 'rabbit.png',\n      url: 'https://images.unsplash.com/photo-1599169713100-120531cef331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'\n    },\n    onClick: () => {\n      alert('onClick()');\n    }\n  }\n}",...Default.parameters?.docs?.source}}},Small.parameters={...Small.parameters,docs:{...Small.parameters?.docs,source:{originalSource:"{\n  args: {\n    image: {\n      id: 1145,\n      isExpired: false,\n      name: 'rabbit.png',\n      url: 'https://images.unsplash.com/photo-1599169713100-120531cef331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'\n    },\n    size: 'sm',\n    onClick: () => {\n      alert('onClick()');\n    }\n  }\n}",...Small.parameters?.docs?.source}}},ExpiredThumbnail.parameters={...ExpiredThumbnail.parameters,docs:{...ExpiredThumbnail.parameters?.docs,source:{originalSource:"{\n  args: {\n    image: {\n      id: 1029,\n      isExpired: true,\n      name: '만료된 이미지',\n      url: ''\n    },\n    onClick: () => {\n      alert('onClick()');\n    }\n  }\n}",...ExpiredThumbnail.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Small","ExpiredThumbnail"]},"./src/assets/png/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{WG:()=>feed_empty_image_namespaceObject,Rs:()=>link_empty_image_namespaceObject,Ok:()=>mouse_pointer_namespaceObject,Ep:()=>notice_thread_background_namespaceObject,wp:()=>thumbnail_fallback_image_namespaceObject});const notice_thread_background_namespaceObject=__webpack_require__.p+"static/media/notice-thread-background.48ca8103.png",link_empty_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/link-empty-image.5fc72217.png"),feed_empty_image_namespaceObject=__webpack_require__.p+"static/media/feed-empty-image.0ca39879.png",mouse_pointer_namespaceObject=__webpack_require__.p+"static/media/mouse-pointer.0c55151b.png",thumbnail_fallback_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/thumbnail-fallback-image.c23bee9d.png")},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ViewableThumbnail_ViewableThumbnail});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.li`
  flex-shrink: 0;

  width: ${({size="md"})=>"md"===size?"96px":"76px"};
  height: ${({size="md"})=>"md"===size?"96px":"76px"};

  border-radius: ${({size="md"})=>"md"===size?"12px":"10px"};
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
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),png=__webpack_require__("./src/assets/png/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ViewableThumbnail=props=>{const{image,size="md",onClick}=props,{isExpired,name,url}=image;return(0,jsx_runtime.jsx)(Container,{size,children:(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:viewButton,onClick,"aria-label":`${name} 이미지 자세히 보기`,children:(0,jsx_runtime.jsx)(Image,{src:isExpired?png.wp:url,alt:name,onError:e=>{e.currentTarget.src=png.wp,e.currentTarget.alt="손상된 이미지"}})})})};ViewableThumbnail.displayName="ViewableThumbnail";const ViewableThumbnail_ViewableThumbnail=ViewableThumbnail;try{ViewableThumbnail.displayName="ViewableThumbnail",ViewableThumbnail.__docgenInfo={description:"",displayName:"ViewableThumbnail",props:{image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"ThreadImage"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx#ViewableThumbnail"]={docgenInfo:ViewableThumbnail.__docgenInfo,name:"ViewableThumbnail",path:"src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx#ViewableThumbnail"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-feed-ViewableThumbnail-ViewableThumbnail-stories.1a92e506.iframe.bundle.js.map