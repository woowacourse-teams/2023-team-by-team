"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4611],{"./src/components/feed/PageIndicator/PageIndicator.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _components_feed_PageIndicator_PageIndicator__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/feed/PageIndicator/PageIndicator.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"common/PageIndicator",component:_components_feed_PageIndicator_PageIndicator__WEBPACK_IMPORTED_MODULE_0__.Z,tags:["autodocs"],decorators:[Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{display:"flex",backgroundColor:"#393939",height:"120px",justifyContent:"center",alignItems:"center"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})})],parameters:{docs:{description:{component:"`PageIndicator`는 현재 메뉴의 페이지가 몇 페이지인지를 시각적으로 표현하고, 페이지 전환 기능을 제공합니다. 슬라이드 쇼 등의 메뉴에서 사용하기에 적합합니다.\n검은색 컨테이너는 이 컴포넌트에 포함되지 않습니다."}}}},Default={args:{pageCount:4,currentPage:1,onChangePage:page=>{alert(`onChangePage(${page});`)}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    pageCount: 4,\n    currentPage: 1,\n    onChangePage: (page: number) => {\n      alert(`onChangePage(${page});`);\n    }\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/PageIndicator/PageIndicator.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PageIndicator_PageIndicator});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: inline-flex;
  flex-direction: column;
  gap: 10px;

  height: 66px;
`,NumericIndicator=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  height: 40px;
`,DotIndicator=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  column-gap: 4px;
`,Dot=styled_components_browser_esm.zo.button`
  width: 14px;
  height: 14px;

  border-radius: 50%;
  background-color: ${({theme,$selected})=>$selected?theme.color.WHITE:theme.color.GRAY550};

  transition: 0.2s;
`,currentPageText=styled_components_browser_esm.iv`
  color: ${({theme})=>theme.color.WHITE};
  font-size: 34px;
  line-height: 34px;
`,pageCountText=styled_components_browser_esm.iv`
  color: ${({theme})=>theme.color.GRAY550};
  font-size: 24px;
  line-height: 30px;
`;var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),arrayOf=__webpack_require__("./src/utils/arrayOf.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const PageIndicator=props=>{const{pageCount,currentPage,onChangePage}=props;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(NumericIndicator,{"aria-label":`${pageCount}개의 페이지 중 ${currentPage}번째 페이지`,children:[(0,jsx_runtime.jsx)(Text.Z,{as:"span",weight:"semiBold",css:currentPageText,children:currentPage}),(0,jsx_runtime.jsx)(Text.Z,{as:"span",weight:"semiBold",css:pageCountText,children:`/${pageCount}`})]}),(0,jsx_runtime.jsx)(DotIndicator,{children:(0,arrayOf.C)(pageCount).map(((_,index)=>(0,jsx_runtime.jsx)(Dot,{type:"button",onClick:()=>onChangePage(index+1),$selected:index+1===currentPage,"aria-label":`${index+1}번째 페이지 보기`},index)))})]})};PageIndicator.displayName="PageIndicator";const PageIndicator_PageIndicator=PageIndicator;try{PageIndicator.displayName="PageIndicator",PageIndicator.__docgenInfo={description:"",displayName:"PageIndicator",props:{pageCount:{defaultValue:null,description:"",name:"pageCount",required:!0,type:{name:"number"}},currentPage:{defaultValue:null,description:"",name:"currentPage",required:!0,type:{name:"number"}},onChangePage:{defaultValue:null,description:"",name:"onChangePage",required:!0,type:{name:"(page: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/PageIndicator/PageIndicator.tsx#PageIndicator"]={docgenInfo:PageIndicator.__docgenInfo,name:"PageIndicator",path:"src/components/feed/PageIndicator/PageIndicator.tsx#PageIndicator"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/arrayOf.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>arrayOf});const arrayOf=count=>[...new Array(count).keys()]}}]);
//# sourceMappingURL=components-feed-PageIndicator-PageIndicator-stories.c07376e1.iframe.bundle.js.map