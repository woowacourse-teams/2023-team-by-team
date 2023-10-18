"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8254],{"./src/components/common/Text/Text.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MdBold:()=>MdBold,MdLight:()=>MdLight,MdNormal:()=>MdNormal,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"common/Text",component:__webpack_require__("./src/components/common/Text/Text.tsx").Z,tags:["autodocs"]},MdLight={args:{size:"md",weight:"light",children:"안녕하세요 팀바팀입니다."}},MdNormal={args:{size:"md",weight:"normal",children:"안녕하세요 팀바팀입니다."}},MdBold={args:{size:"md",weight:"bold",children:"안녕하세요 팀바팀입니다."}};MdLight.parameters={...MdLight.parameters,docs:{...MdLight.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'md',\n    weight: 'light',\n    children: '안녕하세요 팀바팀입니다.'\n  }\n}",...MdLight.parameters?.docs?.source}}},MdNormal.parameters={...MdNormal.parameters,docs:{...MdNormal.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'md',\n    weight: 'normal',\n    children: '안녕하세요 팀바팀입니다.'\n  }\n}",...MdNormal.parameters?.docs?.source}}},MdBold.parameters={...MdBold.parameters,docs:{...MdBold.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'md',\n    weight: 'bold',\n    children: '안녕하세요 팀바팀입니다.'\n  }\n}",...MdBold.parameters?.docs?.source}}};const __namedExportsOrder=["MdLight","MdNormal","MdBold"]},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-common-Text-Text-stories.84906a88.iframe.bundle.js.map