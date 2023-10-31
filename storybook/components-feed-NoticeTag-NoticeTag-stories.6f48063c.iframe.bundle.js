"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5855],{"./src/components/feed/NoticeTag/NoticeTag.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Small:()=>Small,__namedExportsOrder:()=>__namedExportsOrder,default:()=>NoticeTag_stories});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const TagContainer=styled_components_browser_esm.zo.div.withConfig({shouldForwardProp:prop=>!["size","css"].includes(prop)})`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;

  width: ${({size="md"})=>"md"===size?"150px":"42px"};
  height: 42px;

  border-radius: 18px;
  background-color: ${({theme})=>theme.color.PRIMARY};

  box-shadow: 0 0 10px ${({theme})=>theme.color.GRAY400};

  ${({css})=>css}
`,tagLabel=styled_components_browser_esm.iv`
  color: ${({theme})=>theme.color.WHITE};
`;var svg=__webpack_require__("./src/assets/svg/index.ts"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const NoticeTag=props=>{const{size="md",css}=props;return(0,jsx_runtime.jsxs)(TagContainer,{size,css,children:[(0,jsx_runtime.jsx)(svg.ps,{}),"md"===size&&(0,jsx_runtime.jsx)(Text.Z,{size:"lg",weight:"bold",css:tagLabel,children:"중요 공지"})]})};NoticeTag.displayName="NoticeTag";const NoticeTag_NoticeTag=NoticeTag;try{NoticeTag.displayName="NoticeTag",NoticeTag.__docgenInfo={description:"",displayName:"NoticeTag",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/NoticeTag/NoticeTag.tsx#NoticeTag"]={docgenInfo:NoticeTag.__docgenInfo,name:"NoticeTag",path:"src/components/feed/NoticeTag/NoticeTag.tsx#NoticeTag"})}catch(__react_docgen_typescript_loader_error){}const NoticeTag_stories={title:"Feed/NoticeTag",component:NoticeTag_NoticeTag,tags:["autodocs"],parameters:{docs:{description:{component:"`NoticeTag` 는 공지 여부임을 표시하는 카테고리 컴포넌트입니다."}}}},Default={args:{size:"md"}},Small={args:{size:"sm"}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'md'\n  }\n}",...Default.parameters?.docs?.source}}},Small.parameters={...Small.parameters,docs:{...Small.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'sm'\n  }\n}",...Small.parameters?.docs?.source},description:{story:"이 사이즈는 모아보기 페이지에서 사용될 사이즈입니다.",...Small.parameters?.docs?.description}}};const __namedExportsOrder=["Default","Small"];try{Small.displayName="Small",Small.__docgenInfo={description:"이 사이즈는 모아보기 페이지에서 사용될 사이즈입니다.",displayName:"Small",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/NoticeTag/NoticeTag.stories.tsx#Small"]={docgenInfo:Small.__docgenInfo,name:"Small",path:"src/components/feed/NoticeTag/NoticeTag.stories.tsx#Small"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
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
//# sourceMappingURL=components-feed-NoticeTag-NoticeTag-stories.6f48063c.iframe.bundle.js.map