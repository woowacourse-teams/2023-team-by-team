"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7185],{"./src/components/landing/TeamCalendarDecoration/TeamCalendarDecoration.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,NoAnimation:()=>NoAnimation,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _TeamCalendarDecoration__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/landing/TeamCalendarDecoration/TeamCalendarDecoration.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"landing/TeamCalendarDecoration",component:_TeamCalendarDecoration__WEBPACK_IMPORTED_MODULE_0__.Z,tags:["autodocs"],decorators:[Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{position:"relative",width:"640px",height:"910px",backgroundColor:"#d1ddff"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})})],parameters:{docs:{description:{component:"`TeamCalendarDecoration` 컴포넌트는 랜딩 페이지의 장식 컴포넌트인 `IntroCardPile` 의 첫 번째 장면 해당하는 컴포넌트입니다.\n**팀 캘린더**에 대한 모형을 애니메이션과 함께 보여줍니다."}}}},Default={args:{}},NoAnimation={args:{animation:!1}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source},description:{story:"하늘색의 컨테이너는 본 컴포넌트에 포함되지 않습니다.",...Default.parameters?.docs?.description}}},NoAnimation.parameters={...NoAnimation.parameters,docs:{...NoAnimation.parameters?.docs,source:{originalSource:"{\n  args: {\n    animation: false\n  }\n}",...NoAnimation.parameters?.docs?.source},description:{story:"이 옵션은 이 컴포넌트가 주목을 끌어서는 안 되는 페이지에 사용하기에 적합합니다.\n랜딩 페이지를 제외한 페이지에서는 이 옵션이 사용될 것입니다.\n\n참고로, 다른 `IntroCardPile` 의 장면들의 경우 이 옵션이 없는데,\n이는 `IntroCardPile` 에서 애니메이션을 보여주지 않는 옵션이 켜졌을 경우 다른 장면들은 랜더링될 일이 없기 때문입니다.",...NoAnimation.parameters?.docs?.description}}};const __namedExportsOrder=["Default","NoAnimation"];try{Default.displayName="Default",Default.__docgenInfo={description:"하늘색의 컨테이너는 본 컴포넌트에 포함되지 않습니다.",displayName:"Default",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/landing/TeamCalendarDecoration/TeamCalendarDecoration.stories.tsx#Default"]={docgenInfo:Default.__docgenInfo,name:"Default",path:"src/components/landing/TeamCalendarDecoration/TeamCalendarDecoration.stories.tsx#Default"})}catch(__react_docgen_typescript_loader_error){}try{NoAnimation.displayName="NoAnimation",NoAnimation.__docgenInfo={description:"이 옵션은 이 컴포넌트가 주목을 끌어서는 안 되는 페이지에 사용하기에 적합합니다.\n랜딩 페이지를 제외한 페이지에서는 이 옵션이 사용될 것입니다.\n\n참고로, 다른 `IntroCardPile` 의 장면들의 경우 이 옵션이 없는데,\n이는 `IntroCardPile` 에서 애니메이션을 보여주지 않는 옵션이 켜졌을 경우 다른 장면들은 랜더링될 일이 없기 때문입니다.",displayName:"NoAnimation",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/landing/TeamCalendarDecoration/TeamCalendarDecoration.stories.tsx#NoAnimation"]={docgenInfo:NoAnimation.__docgenInfo,name:"NoAnimation",path:"src/components/landing/TeamCalendarDecoration/TeamCalendarDecoration.stories.tsx#NoAnimation"})}catch(__react_docgen_typescript_loader_error){}},"./src/assets/png/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{WG:()=>feed_empty_image_namespaceObject,Rs:()=>link_empty_image_namespaceObject,Ok:()=>mouse_pointer_namespaceObject,Ep:()=>notice_thread_background_namespaceObject,wp:()=>thumbnail_fallback_image_namespaceObject});const notice_thread_background_namespaceObject=__webpack_require__.p+"static/media/notice-thread-background.48ca8103.png",link_empty_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/link-empty-image.5fc72217.png"),feed_empty_image_namespaceObject=__webpack_require__.p+"static/media/feed-empty-image.0ca39879.png",mouse_pointer_namespaceObject=__webpack_require__.p+"static/media/mouse-pointer.0c55151b.png",thumbnail_fallback_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/thumbnail-fallback-image.c23bee9d.png")},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/landing/TeamCalendarDecoration/TeamCalendarDecoration.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TeamCalendarDecoration_TeamCalendarDecoration});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`,CalendarHeaderContainer=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 16px;

  width: 100%;
  height: 40px;
`,CalendarContainer=styled_components_browser_esm.zo.div`
  position: relative;

  width: 100%;
  height: 500px;
`,CalendarTable=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;

  width: 100%;
  height: 100%;
`,SampleCalendarBarContainer=styled_components_browser_esm.zo.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`,SampleCalendarBar=styled_components_browser_esm.zo.div`
  position: absolute;
  top: ${({row,level})=>`calc(${100*row/6}% + ${28*(level+1)-4}px)`};
  left: ${({column})=>100*column/7+"%"};

  width: ${({length,roundedStart,roundedEnd})=>`calc(${100*length/7}% - ${10*((roundedStart?1:0)+(roundedEnd?1:0))}px)`};
  height: 24px;
  margin-left: ${({roundedStart})=>roundedStart?"10px":"0"};

  border-radius: ${({roundedStart,roundedEnd})=>`${roundedStart?"8px":"0"} ${roundedEnd?"8px 8px":"0 0"} ${roundedStart?"8px":"0"}`};
  background-color: ${({color})=>color};
`,CalendarCell=styled_components_browser_esm.zo.div`
  background-color: ${({theme})=>theme.color.BLUE200};
`,backAndForth=styled_components_browser_esm.F4`
  0% {
    top: 70%;
    left: 70%;
    opacity: 0;
  }
  14% {
    top: 70%;
    left: 70%;
    opacity: 1;
  }
  28% {
    top: 50%;
    left: 80%;
    opacity: 1;
  }
  42% {
    top: 50%;
    left: 80%;
    opacity: 0;
  }
  56% {
    top: 50%;
    left: 80%;
    opacity: 1;
  }
  70% {
    top: 70%;
    left: 70%;
    opacity: 1;
  }
  84% {
    top: 70%;
    left: 70%;
    opacity: 0;
  }
`,MousePointer=styled_components_browser_esm.zo.img`
  position: absolute;
  top: 70%;
  left: 70%;

  width: 40px;

  opacity: 0;

  ${({animation=!0})=>animation&&styled_components_browser_esm.iv`
      animation: ${backAndForth} 7s infinite;
    `};
`,calendarHeaderText=styled_components_browser_esm.iv`
  color: ${({theme})=>theme.color.BLUE600};

  font-weight: 600;
  font-size: 28px;
`;var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),png=__webpack_require__("./src/assets/png/index.ts"),landing=__webpack_require__("./src/constants/landing.ts"),parseDate=__webpack_require__("./src/utils/parseDate.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TeamCalendarDecoration=props=>{const{animation=!0}=props,{year,month}=(0,parseDate.s)(new Date),YYYYMM=`${year}-${String(month+1).padStart(2,"0")}`;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(SampleBadge,{}),(0,jsx_runtime.jsxs)(CalendarHeaderContainer,{children:[(0,jsx_runtime.jsx)(svg.Y4,{}),(0,jsx_runtime.jsx)(Text.Z,{css:calendarHeaderText,children:YYYYMM}),(0,jsx_runtime.jsx)(svg.LZ,{})]}),(0,jsx_runtime.jsxs)(CalendarContainer,{children:[(0,jsx_runtime.jsx)(CalendarTable,{children:Array.from({length:landing.W}).map(((_,index)=>(0,jsx_runtime.jsx)(CalendarCell,{},index)))}),(0,jsx_runtime.jsxs)(SampleCalendarBarContainer,{children:[(0,jsx_runtime.jsx)(SampleCalendarBar,{row:0,column:0,length:4,level:0,roundedStart:!0,roundedEnd:!0,color:"#193ecb"}),(0,jsx_runtime.jsx)(SampleCalendarBar,{row:0,column:2,length:4,level:1,roundedStart:!0,roundedEnd:!0,color:"#7c25ff"}),(0,jsx_runtime.jsx)(SampleCalendarBar,{row:2,column:2,length:5,level:0,roundedStart:!0,roundedEnd:!1,color:"#2546ff"}),(0,jsx_runtime.jsx)(SampleCalendarBar,{row:3,column:0,length:7,level:0,roundedStart:!1,roundedEnd:!1,color:"#2546ff"}),(0,jsx_runtime.jsx)(SampleCalendarBar,{row:4,column:0,length:3,level:0,roundedStart:!1,roundedEnd:!0,color:"#2546ff"}),(0,jsx_runtime.jsx)(SampleCalendarBar,{row:3,column:1,length:5,level:1,roundedStart:!0,roundedEnd:!0,color:"#2596ff"}),(0,jsx_runtime.jsx)(SampleCalendarBar,{row:5,column:4,length:3,level:0,roundedStart:!0,roundedEnd:!1,color:"#2cbeeb"})]})]}),(0,jsx_runtime.jsx)(MousePointer,{src:png.Ok,animation})]})};TeamCalendarDecoration.displayName="TeamCalendarDecoration";const TeamCalendarDecoration_TeamCalendarDecoration=TeamCalendarDecoration;try{TeamCalendarDecoration.displayName="TeamCalendarDecoration",TeamCalendarDecoration.__docgenInfo={description:"",displayName:"TeamCalendarDecoration",props:{animation:{defaultValue:null,description:"",name:"animation",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/landing/TeamCalendarDecoration/TeamCalendarDecoration.tsx#TeamCalendarDecoration"]={docgenInfo:TeamCalendarDecoration.__docgenInfo,name:"TeamCalendarDecoration",path:"src/components/landing/TeamCalendarDecoration/TeamCalendarDecoration.tsx#TeamCalendarDecoration"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/landing.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>CELL_COUNT,q:()=>CARD_COUNT});const CELL_COUNT=42,CARD_COUNT=3},"./src/utils/parseDate.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>parseDate});const parseDate=rawDate=>({year:rawDate.getFullYear(),month:rawDate.getMonth(),date:rawDate.getDate(),day:rawDate.getDay()})}}]);
//# sourceMappingURL=components-landing-TeamCalendarDecoration-TeamCalendarDecoration-stories.e320bed7.iframe.bundle.js.map