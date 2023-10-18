"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2588],{"./src/components/landing/FeedDecoration/FeedDecoration.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _FeedDecoration__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/landing/FeedDecoration/FeedDecoration.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"landing/FeedDecoration",component:_FeedDecoration__WEBPACK_IMPORTED_MODULE_0__.Z,tags:["autodocs"],decorators:[Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{position:"relative",width:"640px",height:"910px",backgroundColor:"#d1ddff"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})})],parameters:{docs:{description:{component:"`FeedDecoration` 컴포넌트는 랜딩 페이지의 장식 컴포넌트인 `IntroCardPile` 의 두 번째 장면 해당하는 컴포넌트입니다.\n**팀 피드**에 대한 모형을 애니메이션과 함께 보여줍니다."}}}},Default={args:{}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source},description:{story:"하늘색의 컨테이너는 본 컴포넌트에 포함되지 않습니다.",...Default.parameters?.docs?.description}}};const __namedExportsOrder=["Default"];try{Default.displayName="Default",Default.__docgenInfo={description:"하늘색의 컨테이너는 본 컴포넌트에 포함되지 않습니다.",displayName:"Default",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/landing/FeedDecoration/FeedDecoration.stories.tsx#Default"]={docgenInfo:Default.__docgenInfo,name:"Default",path:"src/components/landing/FeedDecoration/FeedDecoration.stories.tsx#Default"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/landing/FeedDecoration/FeedDecoration.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>FeedDecoration_FeedDecoration});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`,SampleThread=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  width: 100%;
  padding: 30px;

  border-radius: 20px;

  ${({css})=>css};
`,CircleButtonsContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  position: absolute;
  top: 476px;
  right: 66px;
`,CircleButton=styled_components_browser_esm.zo.div`
  width: 68px;
  height: 68px;
  padding: 14px;

  border-radius: 34px;
  background-color: #193ecb;

  & svg {
    width: 100%;
    height: 100%;

    color: ${({theme})=>theme.color.BLUE400};
  }
`,WritingLine=styled_components_browser_esm.zo.div`
  width: 0;
  height: 20px;
  border-radius: 10px;

  background-color: ${({color,theme})=>"dark"===color?theme.color.BLUE500:theme.color.BLUE600};

  animation: ${({width})=>(width=>styled_components_browser_esm.F4`
  from {
    width: 0;
  }
  to {
    width: ${width};
  }
`)(width)} 2.5s forwards;
  animation-delay: ${({delay})=>delay};
`,sampleThread1=styled_components_browser_esm.iv`
  height: 200px;

  background-color: ${({theme})=>theme.color.BLUE700};
`,sampleThread2=styled_components_browser_esm.iv`
  height: 150px;

  background-color: ${({theme})=>theme.color.BLUE300};
`,sampleThread3=styled_components_browser_esm.iv`
  height: 120px;

  background-color: ${({theme})=>theme.color.BLUE300};
`;var svg=__webpack_require__("./src/assets/svg/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const FeedDecoration=()=>(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(SampleBadge,{}),(0,jsx_runtime.jsxs)(SampleThread,{css:sampleThread1,children:[(0,jsx_runtime.jsx)(WritingLine,{width:"85%",delay:"1s",color:"light"}),(0,jsx_runtime.jsx)(WritingLine,{width:"55%",delay:"1.3s",color:"light"}),(0,jsx_runtime.jsx)(WritingLine,{width:"60%",delay:"1.6s",color:"light"})]}),(0,jsx_runtime.jsxs)(SampleThread,{css:sampleThread2,children:[(0,jsx_runtime.jsx)(WritingLine,{width:"70%",delay:"2.8s",color:"dark"}),(0,jsx_runtime.jsx)(WritingLine,{width:"30%",delay:"3.1s",color:"dark"})]}),(0,jsx_runtime.jsx)(SampleThread,{css:sampleThread3}),(0,jsx_runtime.jsxs)(CircleButtonsContainer,{children:[(0,jsx_runtime.jsx)(CircleButton,{children:(0,jsx_runtime.jsx)(svg.Hf,{})}),(0,jsx_runtime.jsx)(CircleButton,{children:(0,jsx_runtime.jsx)(svg.ZD,{})})]})]});FeedDecoration.displayName="FeedDecoration";const FeedDecoration_FeedDecoration=FeedDecoration}}]);
//# sourceMappingURL=components-landing-FeedDecoration-FeedDecoration-stories.3a0f4793.iframe.bundle.js.map