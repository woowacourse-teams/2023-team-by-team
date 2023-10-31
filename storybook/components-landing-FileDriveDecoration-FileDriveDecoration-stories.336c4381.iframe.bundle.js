"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9937],{"./src/components/landing/FileDriveDecoration/FileDriveDecoration.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _FileDriveDecoration__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/landing/FileDriveDecoration/FileDriveDecoration.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"landing/FileDriveDecoration",component:_FileDriveDecoration__WEBPACK_IMPORTED_MODULE_0__.Z,tags:["autodocs"],decorators:[Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{position:"relative",width:"640px",height:"910px",backgroundColor:"#d1ddff"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})})],parameters:{docs:{description:{component:"`FileDriveDecoration` 컴포넌트는 랜딩 페이지의 장식 컴포넌트인 `IntroCardPile` 의 세 번째 장면 해당하는 컴포넌트입니다.\n**팀 드라이브**에 대한 모형을 애니메이션과 함께 보여줍니다.\n이 컴포넌트를 작성하는 시점에서, 팀 드라이브의 UI는 구상이 되어 있지 않았기에, 추후 구상이 완료될 경우 이 UI는 바뀔 수도 있습니다."}}}},Default={args:{}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source},description:{story:"하늘색의 컨테이너는 본 컴포넌트에 포함되지 않습니다.",...Default.parameters?.docs?.description}}};const __namedExportsOrder=["Default"];try{Default.displayName="Default",Default.__docgenInfo={description:"하늘색의 컨테이너는 본 컴포넌트에 포함되지 않습니다.",displayName:"Default",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/landing/FileDriveDecoration/FileDriveDecoration.stories.tsx#Default"]={docgenInfo:Default.__docgenInfo,name:"Default",path:"src/components/landing/FileDriveDecoration/FileDriveDecoration.stories.tsx#Default"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/landing/FileDriveDecoration/FileDriveDecoration.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>FileDriveDecoration_FileDriveDecoration});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  width: 100%;
  height: 100%;
  padding: 50px;
`,SampleBadge=styled_components_browser_esm.zo.div`
  width: 36px;
  height: 36px;

  border-radius: 18px;
  background-color: ${({theme})=>theme.color.BLUE600};
`,WritingLinesContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  row-gap: 50px;

  padding-top: 30px;
`,blink=styled_components_browser_esm.F4`
  0% {
    opacity: 1;
  }
  12% {
    opacity: 0.4;
  }
  24%,
  100% {
    opacity: 1;
  }
`,WritingLine=(styled_components_browser_esm.zo.div`
  width: 80px;
  height: 60px;
`,styled_components_browser_esm.zo.div`
  width: ${({$width})=>$width};
  height: 8px;

  background-color: ${({theme})=>theme.color.BLUE500};

  animation: ${blink} 5s infinite;
  animation-delay: ${({$delay})=>$delay};
`);var svg=__webpack_require__("./src/assets/svg/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const FileDriveDecoration=()=>(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(SampleBadge,{}),(0,jsx_runtime.jsx)(svg.ry,{}),(0,jsx_runtime.jsxs)(WritingLinesContainer,{children:[(0,jsx_runtime.jsx)(WritingLine,{$width:"46%",$delay:"0s"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"60%",$delay:"0.3s"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"52%",$delay:"0.6s"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"0",$delay:"0"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"60%",$delay:"0.9s"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"72%",$delay:"1.2s"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"66%",$delay:"1.5s"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"38%",$delay:"1.8s"})]})]});FileDriveDecoration.displayName="FileDriveDecoration";const FileDriveDecoration_FileDriveDecoration=FileDriveDecoration}}]);
//# sourceMappingURL=components-landing-FileDriveDecoration-FileDriveDecoration-stories.336c4381.iframe.bundle.js.map