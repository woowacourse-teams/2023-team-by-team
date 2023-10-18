"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8298],{"./src/components/common/Skeleton/Skeleton.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"common/Skeleton",component:__webpack_require__("./src/components/common/Skeleton/Skeleton.tsx").Z,tags:["autodocs"]},Default={args:{}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/Skeleton/Skeleton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Skeleton_Skeleton});const Wrapper=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").ZP.div`
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.03);
  border-radius: ${({variant})=>"circle"===variant?"50%":"4px"};

  ${({css})=>css}

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.06),
      transparent
    );

    animation: ${({theme})=>theme.animation.loading} 1.5s linear 0.5s
      infinite;

    content: '';
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Skeleton=props=>{const{variant="normal",css}=props;return(0,jsx_runtime.jsx)(Wrapper,{variant,css})};Skeleton.displayName="Skeleton";const Skeleton_Skeleton=Skeleton;try{Skeleton.displayName="Skeleton",Skeleton.__docgenInfo={description:"",displayName:"Skeleton",props:{variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"circle"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Skeleton/Skeleton.tsx#Skeleton"]={docgenInfo:Skeleton.__docgenInfo,name:"Skeleton",path:"src/components/common/Skeleton/Skeleton.tsx#Skeleton"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-common-Skeleton-Skeleton-stories.32e76fd8.iframe.bundle.js.map