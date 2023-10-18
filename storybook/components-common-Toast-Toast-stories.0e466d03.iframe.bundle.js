"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5648],{"./src/components/common/Toast/Toast.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Error:()=>Error,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Toast_stories});var react=__webpack_require__("./node_modules/react/index.js"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),useToast=__webpack_require__("./src/hooks/useToast.ts");const Wrapper=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 50px;
  padding: 16px 16px;

  border-radius: 4px;

  ${({status,theme})=>{switch(status){case"success":return`\n          background-color: ${theme.color.PRIMARY};\n          color: ${theme.color.WHITE};\n        `;case"error":return`\n          background-color: ${theme.color.RED};\n          color: ${theme.color.WHITE};\n        `}}}

  white-space: pre-line;
  line-height: 1.5;

  animation: ${({theme,isActive})=>isActive?theme.animation.fadeInUp:theme.animation.fadeOut}
    0.4s ease-in-out both;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Toast=props=>{const{closeToast}=(0,useToast.p)(),{id,status="success",message,isActive}=props,ref=(0,react.useRef)(null);return(0,react.useEffect)((()=>{isActive||null===ref.current||ref.current.getAnimations().forEach((animation=>{animation.onfinish=()=>closeToast(id)}))}),[isActive,closeToast,id]),(0,jsx_runtime.jsxs)(Wrapper,{id,ref,status,isActive,children:[(0,jsx_runtime.jsx)(Text.Z,{as:"span",children:message}),(0,jsx_runtime.jsx)("p",{className:"hidden","aria-live":"assertive",children:message})]})};Toast.displayName="Toast";const Toast_Toast=Toast;try{Toast.displayName="Toast",Toast.__docgenInfo={description:"",displayName:"Toast",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},status:{defaultValue:null,description:"",name:"status",required:!1,type:{name:"enum",value:[{value:'"success"'},{value:'"error"'}]}},message:{defaultValue:null,description:"",name:"message",required:!0,type:{name:"string"}},isActive:{defaultValue:null,description:"",name:"isActive",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Toast/Toast.tsx#Toast"]={docgenInfo:Toast.__docgenInfo,name:"Toast",path:"src/components/common/Toast/Toast.tsx#Toast"})}catch(__react_docgen_typescript_loader_error){}const Toast_stories={title:"common/Toast",component:Toast_Toast,tags:["autodocs"]},Default={args:{id:"1",status:"success",message:"기본 Toast입니다.",isActive:!0}},Error={args:{id:"2",status:"error",message:"에러 Toast입니다.",isActive:!0}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    id: '1',\n    status: 'success',\n    message: '기본 Toast입니다.',\n    isActive: true\n  }\n}",...Default.parameters?.docs?.source}}},Error.parameters={...Error.parameters,docs:{...Error.parameters?.docs,source:{originalSource:"{\n  args: {\n    id: '2',\n    status: 'error',\n    message: '에러 Toast입니다.',\n    isActive: true\n  }\n}",...Error.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Error"]},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useToast.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>useToast});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Toast/ToastContext.tsx");const useToast=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__.u);if(void 0===context)throw new Error("useToast must be used within a ToastProvider");return context}}}]);
//# sourceMappingURL=components-common-Toast-Toast-stories.0e466d03.iframe.bundle.js.map