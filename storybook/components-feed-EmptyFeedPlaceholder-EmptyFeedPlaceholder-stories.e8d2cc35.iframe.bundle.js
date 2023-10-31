"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4226],{"./src/components/feed/EmptyFeedPlaceholder/EmptyFeedPlaceholder.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Link/EmptyFeedPlaceholder",component:__webpack_require__("./src/components/feed/EmptyFeedPlaceholder/EmptyFeedPlaceholder.tsx").Z,tags:["autodocs"],parameters:{docs:{description:{component:"`EmptyFeedPlaceholder` 는 `ThreadList` 컴포넌트에 있는 링크가 하나도 없을 경우, 대신 보여줄 화면을 구성하는 컴포넌트입니다."}}}},Default={args:{}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/assets/png/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{WG:()=>feed_empty_image_namespaceObject,Rs:()=>link_empty_image_namespaceObject,Ok:()=>mouse_pointer_namespaceObject,Ep:()=>notice_thread_background_namespaceObject,wp:()=>thumbnail_fallback_image_namespaceObject});const notice_thread_background_namespaceObject=__webpack_require__.p+"static/media/notice-thread-background.48ca8103.png",link_empty_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/link-empty-image.5fc72217.png"),feed_empty_image_namespaceObject=__webpack_require__.p+"static/media/feed-empty-image.0ca39879.png",mouse_pointer_namespaceObject=__webpack_require__.p+"static/media/mouse-pointer.0c55151b.png",thumbnail_fallback_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/thumbnail-fallback-image.c23bee9d.png")},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
  h1&,
  h2&,
  h3&,
  h4&,
  h5&,
  h6& {
    font-weight: bold;
  }
  h1& {
    font-size: 36px;
  }
  h2& {
    font-size: 32px;
  }
  h3& {
    font-size: 28px;
  }
  h4& {
    font-size: 24px;
  }
  p&,
  span&,
  strong&,
  small& {
    font-size: ${({size="md"})=>fontSize[size]||"initial"};
    font-weight: ${({weight="normal"})=>fontWeight[weight]||"initial"};
  }
  && {
    ${props=>props.css}
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/EmptyFeedPlaceholder/EmptyFeedPlaceholder.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>EmptyFeedPlaceholder_EmptyFeedPlaceholder});var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),png=__webpack_require__("./src/assets/png/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`,PlaceholderContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 18px;

  width: 380px;
`,FeedEmptyImage=styled_components_browser_esm.zo.img`
  width: 18%;
  margin-bottom: 10px;
`,titleText=styled_components_browser_esm.iv`
  font-size: 28px;
  color: ${({theme})=>theme.color.GRAY400};
`;styled_components_browser_esm.iv`
  font-size: 20px;
  color: ${({theme})=>theme.color.GRAY500};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const EmptyFeedPlaceholder=()=>(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsxs)(PlaceholderContainer,{children:[(0,jsx_runtime.jsx)(FeedEmptyImage,{src:png.WG,alt:"비어있는 피드 이미지"}),(0,jsx_runtime.jsx)(Text.Z,{weight:"bold",css:titleText,children:"대화를 시작해 보세요!"})]})});EmptyFeedPlaceholder.displayName="EmptyFeedPlaceholder";const EmptyFeedPlaceholder_EmptyFeedPlaceholder=EmptyFeedPlaceholder}}]);
//# sourceMappingURL=components-feed-EmptyFeedPlaceholder-EmptyFeedPlaceholder-stories.e8d2cc35.iframe.bundle.js.map