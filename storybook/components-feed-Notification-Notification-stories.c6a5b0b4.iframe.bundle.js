"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5780],{"./src/components/feed/Notification/Notification.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,LongContent:()=>LongContent,ScheduleNotification:()=>ScheduleNotification,Small:()=>Small,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Notification_stories});var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  color: ${({theme})=>theme.color.WHITE};
  white-space: pre-wrap;

  background-color: ${({theme,teamPlaceColor=0})=>theme.teamColor[teamPlaceColor]};

  filter: brightness(1.2);
  box-shadow: 0 0 8px ${({theme})=>theme.color.GRAY500};

  ${({threadSize})=>"md"===threadSize?styled_components_browser_esm.iv`
        padding: 10px 50px;
        height: 50px;

        border-radius: 20px;
      `:"sm"===threadSize?styled_components_browser_esm.iv`
        padding: 10px 20px;
        height: 42px;

        border-radius: 16px;
      `:void 0}

  &.can-hover {
    &:hover {
      height: 130px;
      text-overflow: initial;
    }

    transition: 0.2s;
  }
`,Inner=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 700px;
  height: 100%;
`,notification=threadSize=>styled_components_browser_esm.iv`
  overflow: hidden;

  width: 100%;
  max-height: 100%;

  font-size: ${"md"===threadSize?18:16}px;
  font-weight: 500;
  letter-spacing: 0.8px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Notification=props=>{const{teamPlaceColor,content,threadSize="md"}=props,isCanHover=/[\r\n]/.test(content)||content.length>80;return(0,jsx_runtime.jsx)(Wrapper,{teamPlaceColor,className:isCanHover?"can-hover":"",threadSize,children:(0,jsx_runtime.jsx)(Inner,{children:(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",css:notification(threadSize),children:content})})})};Notification.displayName="Notification";const Notification_Notification=Notification;try{Notification.displayName="Notification",Notification.__docgenInfo={description:"",displayName:"Notification",props:{teamPlaceColor:{defaultValue:null,description:"",name:"teamPlaceColor",required:!0,type:{name:"enum",value:[{value:"0"},{value:"1"},{value:"2"},{value:"3"},{value:"4"},{value:"5"},{value:"6"},{value:"7"},{value:"8"},{value:"9"},{value:"100"}]}},threadSize:{defaultValue:null,description:"",name:"threadSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/Notification/Notification.tsx#Notification"]={docgenInfo:Notification.__docgenInfo,name:"Notification",path:"src/components/feed/Notification/Notification.tsx#Notification"})}catch(__react_docgen_typescript_loader_error){}const Notification_stories={title:"Feed/Notification",component:Notification_Notification,tags:["autodocs"]},Default={args:{teamPlaceColor:0,content:"'범죄심리학 발표자료..' 일정이 수정되었습니다."}},Small={args:{teamPlaceColor:0,content:"'범죄심리학 발표자료..' 일정이 수정되었습니다.",threadSize:"sm"}},LongContent={args:{teamPlaceColor:0,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}},ScheduleNotification={args:{teamPlaceColor:0,content:"데일리 미팅 일정이 수정되었습니다. \n제목 변경 : 데일리 미팅 > 조별 데일리 미팅 \n기간 변경 : 2023년 9월 1일 10시 00분 ~ 2023년 9월 1일 10시 30분 > 2023년 9월 1일 10시 00분 ~ 2023년 9월 1일 10시 30분"}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    teamPlaceColor: 0,\n    content: \"'범죄심리학 발표자료..' 일정이 수정되었습니다.\"\n  }\n}",...Default.parameters?.docs?.source}}},Small.parameters={...Small.parameters,docs:{...Small.parameters?.docs,source:{originalSource:"{\n  args: {\n    teamPlaceColor: 0,\n    content: \"'범죄심리학 발표자료..' 일정이 수정되었습니다.\",\n    threadSize: 'sm'\n  }\n}",...Small.parameters?.docs?.source}}},LongContent.parameters={...LongContent.parameters,docs:{...LongContent.parameters?.docs,source:{originalSource:"{\n  args: {\n    teamPlaceColor: 0,\n    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'\n  }\n}",...LongContent.parameters?.docs?.source}}},ScheduleNotification.parameters={...ScheduleNotification.parameters,docs:{...ScheduleNotification.parameters?.docs,source:{originalSource:"{\n  args: {\n    teamPlaceColor: 0,\n    content: '데일리 미팅 일정이 수정되었습니다. \\n제목 변경 : 데일리 미팅 > 조별 데일리 미팅 \\n기간 변경 : 2023년 9월 1일 10시 00분 ~ 2023년 9월 1일 10시 30분 > 2023년 9월 1일 10시 00분 ~ 2023년 9월 1일 10시 30분'\n  }\n}",...ScheduleNotification.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Small","LongContent","ScheduleNotification"]},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p`
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
//# sourceMappingURL=components-feed-Notification-Notification-stories.c6a5b0b4.iframe.bundle.js.map