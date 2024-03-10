"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5780],{"./src/components/feed/Notification/Notification.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Date:()=>Date,Default:()=>Default,Join:()=>Join,Leave:()=>Leave,LongContent:()=>LongContent,Small:()=>Small,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Feed/Notification",component:__webpack_require__("./src/components/feed/Notification/Notification.tsx").Z,tags:["autodocs"],argTypes:{content:{description:"알림에 쓰일 내용을 의미합니다."},type:{description:"알림의 종류를 의미합니다. 알림의 종류에 따라 보여지는 아이콘이 달라집니다."},time:{description:"알림의 우측에 표시될 알림의 수신 시각을 의미합니다."},size:{description:"알림 컴포넌트의 크기를 의미합니다. 사용처에 맞게 적절한 값을 사용하십시오."}}},Default={args:{type:"normal",content:"기본 알림입니다."}},LongContent={args:{type:"normal",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce suscipit ac diam ac viverra. Integer euismod, nulla id ullamcorper posuere, mauris ex luctus mauris, eget tincidunt mi dolor vel ante."}},Join={args:{type:"join",time:"23:35",content:"팀바팀 님이 입장하셨습니다."}},Leave={args:{type:"leave",time:"23:35",content:"팀바팀 님이 퇴장하셨습니다."}},Date={args:{type:"date",content:"2023년 2월 7일"}},Small={args:{type:"join",time:"23:35",content:"팀바팀 님이 입장하셨습니다.",size:"sm"}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    type: 'normal',\n    content: '기본 알림입니다.'\n  }\n}",...Default.parameters?.docs?.source}}},LongContent.parameters={...LongContent.parameters,docs:{...LongContent.parameters?.docs,source:{originalSource:"{\n  args: {\n    type: 'normal',\n    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce suscipit ac diam ac viverra. Integer euismod, nulla id ullamcorper posuere, mauris ex luctus mauris, eget tincidunt mi dolor vel ante.'\n  }\n}",...LongContent.parameters?.docs?.source}}},Join.parameters={...Join.parameters,docs:{...Join.parameters?.docs,source:{originalSource:"{\n  args: {\n    type: 'join',\n    time: '23:35',\n    content: '팀바팀 님이 입장하셨습니다.'\n  }\n}",...Join.parameters?.docs?.source}}},Leave.parameters={...Leave.parameters,docs:{...Leave.parameters?.docs,source:{originalSource:"{\n  args: {\n    type: 'leave',\n    time: '23:35',\n    content: '팀바팀 님이 퇴장하셨습니다.'\n  }\n}",...Leave.parameters?.docs?.source}}},Date.parameters={...Date.parameters,docs:{...Date.parameters?.docs,source:{originalSource:"{\n  args: {\n    type: 'date',\n    content: '2023년 2월 7일'\n  }\n}",...Date.parameters?.docs?.source}}},Small.parameters={...Small.parameters,docs:{...Small.parameters?.docs,source:{originalSource:"{\n  args: {\n    type: 'join',\n    time: '23:35',\n    content: '팀바팀 님이 입장하셨습니다.',\n    size: 'sm'\n  }\n}",...Small.parameters?.docs?.source}}};const __namedExportsOrder=["Default","LongContent","Join","Leave","Date","Small"]},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/Notification/Notification.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Notification_Notification});var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  gap: 16px;

  width: 100%;
  height: 30px;
`,Line=styled_components_browser_esm.zo.div`
  flex-grow: 1;

  min-width: 8%;
  margin: auto;
  border-top: 1px solid ${({theme})=>theme.color.BLUE300};
`,Inner=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;

  max-width: 80%;
`,IconWrapper=styled_components_browser_esm.zo.div`
  width: ${({$size})=>"md"===$size?"24px":"20px"};
  height: ${({$size})=>"md"===$size?"24px":"20px"};

  & svg {
    width: ${({$size})=>"md"===$size?"24px":"20px"};
    height: ${({$size})=>"md"===$size?"24px":"20px"};

    color: ${({theme})=>theme.color.BLUE500};
    fill: ${({theme})=>theme.color.BLUE500};
  }
`,Notification_styled_content=styled_components_browser_esm.iv`
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
`,Notification_styled_time=styled_components_browser_esm.iv`
  display: block;

  color: ${({theme})=>theme.color.BLUE500};
`;var svg=__webpack_require__("./src/assets/svg/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Notification=props=>{const{content,type,time,size="md"}=props;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Line,{}),(0,jsx_runtime.jsxs)(Inner,{children:["normal"!==type&&(0,jsx_runtime.jsx)(IconWrapper,{$size:size,children:"join"===type?(0,jsx_runtime.jsx)(svg.m5,{}):"leave"===type?(0,jsx_runtime.jsx)(svg.iz,{}):(0,jsx_runtime.jsx)(svg.Qu,{})}),(0,jsx_runtime.jsx)(Text.Z,{size:"md"===size?"md":"sm",css:Notification_styled_content,children:content}),time&&(0,jsx_runtime.jsx)(Text.Z,{size:"md"===size?"xs":"xxs",css:Notification_styled_time,children:time})]}),(0,jsx_runtime.jsx)(Line,{})]})};Notification.displayName="Notification";const Notification_Notification=Notification;try{Notification.displayName="Notification",Notification.__docgenInfo={description:"",displayName:"Notification",props:{content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"string"}},type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"enum",value:[{value:'"join"'},{value:'"normal"'},{value:'"leave"'},{value:'"date"'}]}},time:{defaultValue:null,description:"",name:"time",required:!1,type:{name:"string"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/Notification/Notification.tsx#Notification"]={docgenInfo:Notification.__docgenInfo,name:"Notification",path:"src/components/feed/Notification/Notification.tsx#Notification"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-feed-Notification-Notification-stories.64594a08.iframe.bundle.js.map