"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1861],{"./src/components/landing/IntroCardPile/IntroCardPile.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,NoAnimation:()=>NoAnimation,__namedExportsOrder:()=>__namedExportsOrder,default:()=>IntroCardPile_stories});var react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  position: fixed;
  display: inline-block;
  overflow: hidden;
  bottom: 0;
  left: 0;

  width: 1100px;
  height: 910px;

  transform-origin: bottom left;

  pointer-events: none;
  z-index: ${({theme})=>theme.zIndex.LANDING_CARD};

  @media screen and (max-height: 930px) {
    transform: scale(0.9);
  }

  @media screen and (max-height: 780px) {
    transform: scale(0.78);
  }

  @media screen and (max-height: 710px) {
    transform: scale(0.7);
  }

  @media screen and (max-height: 630px) {
    transform: scale(0.62);
  }

  @media screen and (max-height: 510px) {
    transform: scale(0.5);
  }

  @media screen and (max-height: 440px) {
    transform: scale(0.41);
  }

  @media screen and (max-height: 390px) {
    transform: scale(0.35);
  }
`,cardRotate=afterDegree=>styled_components_browser_esm.F4`
  0% {
    transform: rotate(-60deg);
  }
  100% {
    transform: rotate(${afterDegree});
  }
`,Card=styled_components_browser_esm.zo.div`
  position: absolute;
  right: 60%;
  bottom: -30%;

  width: 640px;
  height: 910px;

  box-shadow: 0 20px 40px ${({theme})=>theme.color.TRANSPARENT_BLACK};

  transform-origin: bottom right;

  ${({$css})=>$css}
`,invertedFadeInOut=styled_components_browser_esm.F4`
  0% {
    opacity: 1;
  }
  14%,
  86% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`,Blind=styled_components_browser_esm.zo.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: ${({theme})=>theme.color.BLUE100};

  opacity: 0;

  ${({$animation=!0})=>$animation&&styled_components_browser_esm.iv`
      opacity: 1;

      animation: ${invertedFadeInOut} 7s 1.6s infinite;
    `}
`,card1=animation=>styled_components_browser_esm.iv`
  background-color: ${({theme})=>theme.color.BLUE400};

  ${animation?()=>styled_components_browser_esm.iv`
        transform: rotate(-60deg);
        animation: ${()=>cardRotate("10deg")} 1.5s forwards;
      `:()=>styled_components_browser_esm.iv`
        transform: rotate(10deg);
      `}
`,card2=animation=>styled_components_browser_esm.iv`
  background-color: ${({theme})=>theme.color.BLUE200};

  ${animation?()=>styled_components_browser_esm.iv`
        transform: rotate(-60deg);
        animation: ${()=>cardRotate("17deg")} 1.5s 0.3s forwards;
      `:()=>styled_components_browser_esm.iv`
        transform: rotate(17deg);
      `}
`,card3=animation=>styled_components_browser_esm.iv`
  background-color: ${({theme})=>theme.color.BLUE100};

  ${animation?()=>styled_components_browser_esm.iv`
        transform: rotate(-60deg);
        animation: ${cardRotate("24deg")} 1.5s 0.6s forwards;
      `:()=>styled_components_browser_esm.iv`
        transform: rotate(24deg);
      `}
`;var TeamCalendarDecoration=__webpack_require__("./src/components/landing/TeamCalendarDecoration/TeamCalendarDecoration.tsx"),FeedDecoration=__webpack_require__("./src/components/landing/FeedDecoration/FeedDecoration.tsx"),FileDriveDecoration=__webpack_require__("./src/components/landing/FileDriveDecoration/FileDriveDecoration.tsx"),landing=__webpack_require__("./src/constants/landing.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const IntroCardPile=props=>{const{animation=!0}=props,[decorationNo,setDecorationNo]=(0,react.useState)(0),blindRef=(0,react.useRef)(null);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Card,{$css:card1(animation)}),(0,jsx_runtime.jsx)(Card,{$css:card2(animation)}),(0,jsx_runtime.jsxs)(Card,{$css:card3(animation),children:[0===decorationNo?(0,jsx_runtime.jsx)(TeamCalendarDecoration.Z,{animation}):1===decorationNo?(0,jsx_runtime.jsx)(FeedDecoration.Z,{}):(0,jsx_runtime.jsx)(FileDriveDecoration.Z,{}),(0,jsx_runtime.jsx)(Blind,{ref:blindRef,$animation:animation,onAnimationIteration:()=>{setDecorationNo((prev=>(prev+1)%landing.q))}})]})]})};IntroCardPile.displayName="IntroCardPile";const IntroCardPile_IntroCardPile=IntroCardPile;try{IntroCardPile.displayName="IntroCardPile",IntroCardPile.__docgenInfo={description:"",displayName:"IntroCardPile",props:{animation:{defaultValue:null,description:"",name:"animation",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/landing/IntroCardPile/IntroCardPile.tsx#IntroCardPile"]={docgenInfo:IntroCardPile.__docgenInfo,name:"IntroCardPile",path:"src/components/landing/IntroCardPile/IntroCardPile.tsx#IntroCardPile"})}catch(__react_docgen_typescript_loader_error){}const IntroCardPile_stories={title:"landing/IntroCardPile",component:IntroCardPile_IntroCardPile,tags:["autodocs"],parameters:{docs:{description:{component:"`IntroCardPile` 컴포넌트는 랜딩 페이지의 부속품에 해당하는 컴포넌트로,\n여러 장의 카드를 이용하여 팀바팀 서비스의 간략화된 UI를 미리 보여줍니다.\n랜딩 페이지의 왼쪽에 배치하여 메인 디자인 요소로 사용될 것입니다."}}}},Default={args:{}},NoAnimation={args:{animation:!1}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}},NoAnimation.parameters={...NoAnimation.parameters,docs:{...NoAnimation.parameters?.docs,source:{originalSource:"{\n  args: {\n    animation: false\n  }\n}",...NoAnimation.parameters?.docs?.source},description:{story:"이 옵션은 랜딩 페이지와 동일한 배경을 보여주어야 하지만 애니메이션을 이용하여 사용자의 시선을 끌기에는 적합하지 않은 페이지에 적합합니다.\n\n예를 들면, 팀 초대 링크를 입력하는 페이지가 있습니다.",...NoAnimation.parameters?.docs?.description}}};const __namedExportsOrder=["Default","NoAnimation"];try{NoAnimation.displayName="NoAnimation",NoAnimation.__docgenInfo={description:"이 옵션은 랜딩 페이지와 동일한 배경을 보여주어야 하지만 애니메이션을 이용하여 사용자의 시선을 끌기에는 적합하지 않은 페이지에 적합합니다.\n\n예를 들면, 팀 초대 링크를 입력하는 페이지가 있습니다.",displayName:"NoAnimation",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/landing/IntroCardPile/IntroCardPile.stories.tsx#NoAnimation"]={docgenInfo:NoAnimation.__docgenInfo,name:"NoAnimation",path:"src/components/landing/IntroCardPile/IntroCardPile.stories.tsx#NoAnimation"})}catch(__react_docgen_typescript_loader_error){}},"./src/assets/png/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{WG:()=>feed_empty_image_namespaceObject,Rs:()=>link_empty_image_namespaceObject,Ok:()=>mouse_pointer_namespaceObject,Ep:()=>notice_thread_background_namespaceObject,wp:()=>thumbnail_fallback_image_namespaceObject});const notice_thread_background_namespaceObject=__webpack_require__.p+"static/media/notice-thread-background.48ca8103.png",link_empty_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/link-empty-image.5fc72217.png"),feed_empty_image_namespaceObject=__webpack_require__.p+"static/media/feed-empty-image.0ca39879.png",mouse_pointer_namespaceObject=__webpack_require__.p+"static/media/mouse-pointer.0c55151b.png",thumbnail_fallback_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/thumbnail-fallback-image.c23bee9d.png")},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/landing/FeedDecoration/FeedDecoration.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>FeedDecoration_FeedDecoration});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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

  ${({$css})=>$css};
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

  background-color: ${({$color,theme})=>"dark"===$color?theme.color.BLUE500:theme.color.BLUE600};

  animation: ${({$width})=>{return width=$width,styled_components_browser_esm.F4`
  from {
    width: 0;
  }
  to {
    width: ${width};
  }
`;var width}} 2.5s forwards;
  animation-delay: ${({$delay})=>$delay};
`,sampleThread1=styled_components_browser_esm.iv`
  height: 200px;

  background-color: ${({theme})=>theme.color.BLUE700};
`,sampleThread2=styled_components_browser_esm.iv`
  height: 150px;

  background-color: ${({theme})=>theme.color.BLUE300};
`,sampleThread3=styled_components_browser_esm.iv`
  height: 120px;

  background-color: ${({theme})=>theme.color.BLUE300};
`;var svg=__webpack_require__("./src/assets/svg/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const FeedDecoration=()=>(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(SampleBadge,{}),(0,jsx_runtime.jsxs)(SampleThread,{$css:sampleThread1,children:[(0,jsx_runtime.jsx)(WritingLine,{$width:"85%",$delay:"1s",$color:"light"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"55%",$delay:"1.3s",$color:"light"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"60%",$delay:"1.6s",$color:"light"})]}),(0,jsx_runtime.jsxs)(SampleThread,{$css:sampleThread2,children:[(0,jsx_runtime.jsx)(WritingLine,{$width:"70%",$delay:"2.8s",$color:"dark"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"30%",$delay:"3.1s",$color:"dark"})]}),(0,jsx_runtime.jsx)(SampleThread,{$css:sampleThread3}),(0,jsx_runtime.jsxs)(CircleButtonsContainer,{children:[(0,jsx_runtime.jsx)(CircleButton,{children:(0,jsx_runtime.jsx)(svg.Hf,{})}),(0,jsx_runtime.jsx)(CircleButton,{children:(0,jsx_runtime.jsx)(svg.ZD,{})})]})]});FeedDecoration.displayName="FeedDecoration";const FeedDecoration_FeedDecoration=FeedDecoration},"./src/components/landing/FileDriveDecoration/FileDriveDecoration.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>FileDriveDecoration_FileDriveDecoration});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`);var svg=__webpack_require__("./src/assets/svg/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const FileDriveDecoration=()=>(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(SampleBadge,{}),(0,jsx_runtime.jsx)(svg.ry,{}),(0,jsx_runtime.jsxs)(WritingLinesContainer,{children:[(0,jsx_runtime.jsx)(WritingLine,{$width:"46%",$delay:"0s"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"60%",$delay:"0.3s"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"52%",$delay:"0.6s"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"0",$delay:"0"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"60%",$delay:"0.9s"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"72%",$delay:"1.2s"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"66%",$delay:"1.5s"}),(0,jsx_runtime.jsx)(WritingLine,{$width:"38%",$delay:"1.8s"})]})]});FileDriveDecoration.displayName="FileDriveDecoration";const FileDriveDecoration_FileDriveDecoration=FileDriveDecoration},"./src/components/landing/TeamCalendarDecoration/TeamCalendarDecoration.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TeamCalendarDecoration_TeamCalendarDecoration});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
  top: ${({$row,$level})=>`calc(${100*$row/6}% + ${28*($level+1)-4}px)`};
  left: ${({$column})=>100*$column/7+"%"};

  width: ${({$length,$roundedStart,$roundedEnd})=>`calc(${100*$length/7}% - ${10*(($roundedStart?1:0)+($roundedEnd?1:0))}px)`};
  height: 24px;
  margin-left: ${({$roundedStart})=>$roundedStart?"10px":"0"};

  border-radius: ${({$roundedStart,$roundedEnd})=>`${$roundedStart?"8px":"0"} ${$roundedEnd?"8px 8px":"0 0"} ${$roundedStart?"8px":"0"}`};
  background-color: ${({$color})=>$color};
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

  ${({$animation=!0})=>$animation&&styled_components_browser_esm.iv`
      animation: ${backAndForth} 7s infinite;
    `};
`,calendarHeaderText=styled_components_browser_esm.iv`
  color: ${({theme})=>theme.color.BLUE600};

  font-weight: 600;
  font-size: 28px;
`;var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),png=__webpack_require__("./src/assets/png/index.ts"),landing=__webpack_require__("./src/constants/landing.ts"),parseDate=__webpack_require__("./src/utils/parseDate.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TeamCalendarDecoration=props=>{const{animation=!0}=props,{year,month}=(0,parseDate.s)(new Date),YYYYMM=`${year}-${String(month+1).padStart(2,"0")}`;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(SampleBadge,{}),(0,jsx_runtime.jsxs)(CalendarHeaderContainer,{children:[(0,jsx_runtime.jsx)(svg.Y4,{}),(0,jsx_runtime.jsx)(Text.Z,{css:calendarHeaderText,children:YYYYMM}),(0,jsx_runtime.jsx)(svg.LZ,{})]}),(0,jsx_runtime.jsxs)(CalendarContainer,{children:[(0,jsx_runtime.jsx)(CalendarTable,{children:Array.from({length:landing.W}).map(((_,index)=>(0,jsx_runtime.jsx)(CalendarCell,{},index)))}),(0,jsx_runtime.jsxs)(SampleCalendarBarContainer,{children:[(0,jsx_runtime.jsx)(SampleCalendarBar,{$row:0,$column:0,$length:4,$level:0,$roundedStart:!0,$roundedEnd:!0,$color:"#193ecb"}),(0,jsx_runtime.jsx)(SampleCalendarBar,{$row:0,$column:2,$length:4,$level:1,$roundedStart:!0,$roundedEnd:!0,$color:"#7c25ff"}),(0,jsx_runtime.jsx)(SampleCalendarBar,{$row:2,$column:2,$length:5,$level:0,$roundedStart:!0,$roundedEnd:!1,$color:"#2546ff"}),(0,jsx_runtime.jsx)(SampleCalendarBar,{$row:3,$column:0,$length:7,$level:0,$roundedStart:!1,$roundedEnd:!1,$color:"#2546ff"}),(0,jsx_runtime.jsx)(SampleCalendarBar,{$row:4,$column:0,$length:3,$level:0,$roundedStart:!1,$roundedEnd:!0,$color:"#2546ff"}),(0,jsx_runtime.jsx)(SampleCalendarBar,{$row:3,$column:1,$length:5,$level:1,$roundedStart:!0,$roundedEnd:!0,$color:"#2596ff"}),(0,jsx_runtime.jsx)(SampleCalendarBar,{$row:5,$column:4,$length:3,$level:0,$roundedStart:!0,$roundedEnd:!1,$color:"#2cbeeb"})]})]}),(0,jsx_runtime.jsx)(MousePointer,{src:png.Ok,$animation:animation})]})};TeamCalendarDecoration.displayName="TeamCalendarDecoration";const TeamCalendarDecoration_TeamCalendarDecoration=TeamCalendarDecoration;try{TeamCalendarDecoration.displayName="TeamCalendarDecoration",TeamCalendarDecoration.__docgenInfo={description:"",displayName:"TeamCalendarDecoration",props:{animation:{defaultValue:null,description:"",name:"animation",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/landing/TeamCalendarDecoration/TeamCalendarDecoration.tsx#TeamCalendarDecoration"]={docgenInfo:TeamCalendarDecoration.__docgenInfo,name:"TeamCalendarDecoration",path:"src/components/landing/TeamCalendarDecoration/TeamCalendarDecoration.tsx#TeamCalendarDecoration"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/landing.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>CELL_COUNT,q:()=>CARD_COUNT});const CELL_COUNT=42,CARD_COUNT=3},"./src/utils/parseDate.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>parseDate});const parseDate=rawDate=>({year:rawDate.getFullYear(),month:rawDate.getMonth(),date:rawDate.getDate(),day:rawDate.getDay()})}}]);
//# sourceMappingURL=components-landing-IntroCardPile-IntroCardPile-stories.87047494.iframe.bundle.js.map