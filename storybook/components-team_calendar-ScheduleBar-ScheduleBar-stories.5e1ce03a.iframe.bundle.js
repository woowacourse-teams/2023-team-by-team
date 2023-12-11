"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9194],{"./src/components/team_calendar/ScheduleBar/ScheduleBar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Indicator:()=>Indicator,LongTitle:()=>LongTitle,NoInteraction:()=>NoInteraction,NotRounded:()=>NotRounded,RoundedEnd:()=>RoundedEnd,RoundedStart:()=>RoundedStart,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Schedule/ScheduleBar",component:__webpack_require__("./src/components/team_calendar/ScheduleBar/ScheduleBar.tsx").Z,tags:["autodocs"],parameters:{docs:{description:{component:"`ScheduleBar` 는 캘린더의 일정을 바 형태로 시각적으로 보여 주기 위한 컴포넌트입니다."}}}},Default={args:{id:"1",scheduleId:1,schedule:{id:1,title:"테스트",startDateTime:"2023-07-07 05:00",endDateTime:"2023-07-09 10:00"},title:"테스트",row:1,column:2,duration:3,level:0,roundedStart:!0,roundedEnd:!0,onClick:()=>alert("clicked!")}},RoundedStart={args:{id:"1",scheduleId:1,schedule:{id:1,title:"테스트",startDateTime:"2023-07-07 05:00",endDateTime:"2023-07-09 10:00"},title:"테스트",row:1,column:2,duration:3,level:0,roundedStart:!0,roundedEnd:!1,onClick:()=>alert("clicked!")}},RoundedEnd={args:{id:"1",scheduleId:1,schedule:{id:1,title:"테스트",startDateTime:"2023-07-07 05:00",endDateTime:"2023-07-09 10:00"},title:"테스트",row:1,column:2,duration:3,level:0,roundedStart:!1,roundedEnd:!0,onClick:()=>alert("clicked!")}},NotRounded={args:{id:"1",scheduleId:1,schedule:{id:1,title:"테스트",startDateTime:"2023-07-07 05:00",endDateTime:"2023-07-09 10:00"},title:"테스트",row:1,column:2,duration:3,level:0,roundedStart:!1,roundedEnd:!1,onClick:()=>alert("clicked!")}},LongTitle={args:{id:"1",scheduleId:1,schedule:{id:1,title:"테스트",startDateTime:"2023-07-07 05:00",endDateTime:"2023-07-09 10:00"},title:"Woowacourse Woowacourse Woowacourse Woowacourse Woowacourse Woowacourse",row:1,column:2,duration:3,level:0,roundedStart:!0,roundedEnd:!0,onClick:()=>alert("clicked!")}},NoInteraction={args:{id:"1",scheduleId:1,schedule:{id:1,title:"No Interaction",startDateTime:"2023-07-07 05:00",endDateTime:"2023-07-09 10:00"},title:"No Interaction",row:1,column:2,duration:3,level:0,roundedStart:!0,roundedEnd:!0,mode:"no-interaction"}},Indicator={args:{id:"1",scheduleId:1,schedule:{id:1,title:"This should not shown",startDateTime:"2023-07-07 05:00",endDateTime:"2023-07-09 10:00"},title:"This should not shown",row:1,column:2,duration:3,level:0,roundedStart:!0,roundedEnd:!0,mode:"indicator"}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    id: '1',\n    scheduleId: 1,\n    schedule: {\n      id: 1,\n      title: '테스트',\n      startDateTime: '2023-07-07 05:00',\n      endDateTime: '2023-07-09 10:00'\n    },\n    title: '테스트',\n    row: 1,\n    column: 2,\n    duration: 3,\n    level: 0,\n    roundedStart: true,\n    roundedEnd: true,\n    onClick: () => alert('clicked!')\n  }\n}",...Default.parameters?.docs?.source}}},RoundedStart.parameters={...RoundedStart.parameters,docs:{...RoundedStart.parameters?.docs,source:{originalSource:"{\n  args: {\n    id: '1',\n    scheduleId: 1,\n    schedule: {\n      id: 1,\n      title: '테스트',\n      startDateTime: '2023-07-07 05:00',\n      endDateTime: '2023-07-09 10:00'\n    },\n    title: '테스트',\n    row: 1,\n    column: 2,\n    duration: 3,\n    level: 0,\n    roundedStart: true,\n    roundedEnd: false,\n    onClick: () => alert('clicked!')\n  }\n}",...RoundedStart.parameters?.docs?.source}}},RoundedEnd.parameters={...RoundedEnd.parameters,docs:{...RoundedEnd.parameters?.docs,source:{originalSource:"{\n  args: {\n    id: '1',\n    scheduleId: 1,\n    schedule: {\n      id: 1,\n      title: '테스트',\n      startDateTime: '2023-07-07 05:00',\n      endDateTime: '2023-07-09 10:00'\n    },\n    title: '테스트',\n    row: 1,\n    column: 2,\n    duration: 3,\n    level: 0,\n    roundedStart: false,\n    roundedEnd: true,\n    onClick: () => alert('clicked!')\n  }\n}",...RoundedEnd.parameters?.docs?.source}}},NotRounded.parameters={...NotRounded.parameters,docs:{...NotRounded.parameters?.docs,source:{originalSource:"{\n  args: {\n    id: '1',\n    scheduleId: 1,\n    schedule: {\n      id: 1,\n      title: '테스트',\n      startDateTime: '2023-07-07 05:00',\n      endDateTime: '2023-07-09 10:00'\n    },\n    title: '테스트',\n    row: 1,\n    column: 2,\n    duration: 3,\n    level: 0,\n    roundedStart: false,\n    roundedEnd: false,\n    onClick: () => alert('clicked!')\n  }\n}",...NotRounded.parameters?.docs?.source}}},LongTitle.parameters={...LongTitle.parameters,docs:{...LongTitle.parameters?.docs,source:{originalSource:"{\n  args: {\n    id: '1',\n    scheduleId: 1,\n    schedule: {\n      id: 1,\n      title: '테스트',\n      startDateTime: '2023-07-07 05:00',\n      endDateTime: '2023-07-09 10:00'\n    },\n    title: 'Woowacourse Woowacourse Woowacourse Woowacourse Woowacourse Woowacourse',\n    row: 1,\n    column: 2,\n    duration: 3,\n    level: 0,\n    roundedStart: true,\n    roundedEnd: true,\n    onClick: () => alert('clicked!')\n  }\n}",...LongTitle.parameters?.docs?.source}}},NoInteraction.parameters={...NoInteraction.parameters,docs:{...NoInteraction.parameters?.docs,source:{originalSource:"{\n  args: {\n    id: '1',\n    scheduleId: 1,\n    schedule: {\n      id: 1,\n      title: 'No Interaction',\n      startDateTime: '2023-07-07 05:00',\n      endDateTime: '2023-07-09 10:00'\n    },\n    title: 'No Interaction',\n    row: 1,\n    column: 2,\n    duration: 3,\n    level: 0,\n    roundedStart: true,\n    roundedEnd: true,\n    mode: 'no-interaction'\n  }\n}",...NoInteraction.parameters?.docs?.source},description:{story:"`mode` 값이 `no-interaction`일 경우, 해당 캘린더 바는 오로지 장식 용도가 되며 **상호작용이 불가능**하게 됩니다. 가짜 스케줄 바 드래그 화면 등 시각적인 효과를 위해 사용할 수 있습니다.",...NoInteraction.parameters?.docs?.description}}},Indicator.parameters={...Indicator.parameters,docs:{...Indicator.parameters?.docs,source:{originalSource:"{\n  args: {\n    id: '1',\n    scheduleId: 1,\n    schedule: {\n      id: 1,\n      title: 'This should not shown',\n      startDateTime: '2023-07-07 05:00',\n      endDateTime: '2023-07-09 10:00'\n    },\n    title: 'This should not shown',\n    row: 1,\n    column: 2,\n    duration: 3,\n    level: 0,\n    roundedStart: true,\n    roundedEnd: true,\n    mode: 'indicator'\n  }\n}",...Indicator.parameters?.docs?.source},description:{story:"`mode` 값이 `indicator`일 경우, 해당 캘린더 바는 **상호작용이 불가능하고 캘린더 바의 윤곽만 드러내는** 시각적 요소가 됩니다. 캘린더 바가 놓일 위치를 시각적으로 표시하는 데에 사용합니다.",...Indicator.parameters?.docs?.description}}};const __namedExportsOrder=["Default","RoundedStart","RoundedEnd","NotRounded","LongTitle","NoInteraction","Indicator"];try{NoInteraction.displayName="NoInteraction",NoInteraction.__docgenInfo={description:"`mode` 값이 `no-interaction`일 경우, 해당 캘린더 바는 오로지 장식 용도가 되며 **상호작용이 불가능**하게 됩니다. 가짜 스케줄 바 드래그 화면 등 시각적인 효과를 위해 사용할 수 있습니다.",displayName:"NoInteraction",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleBar/ScheduleBar.stories.tsx#NoInteraction"]={docgenInfo:NoInteraction.__docgenInfo,name:"NoInteraction",path:"src/components/team_calendar/ScheduleBar/ScheduleBar.stories.tsx#NoInteraction"})}catch(__react_docgen_typescript_loader_error){}try{Indicator.displayName="Indicator",Indicator.__docgenInfo={description:"`mode` 값이 `indicator`일 경우, 해당 캘린더 바는 **상호작용이 불가능하고 캘린더 바의 윤곽만 드러내는** 시각적 요소가 됩니다. 캘린더 바가 놓일 위치를 시각적으로 표시하는 데에 사용합니다.",displayName:"Indicator",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleBar/ScheduleBar.stories.tsx#Indicator"]={docgenInfo:Indicator.__docgenInfo,name:"Indicator",path:"src/components/team_calendar/ScheduleBar/ScheduleBar.stories.tsx#Indicator"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/ScheduleBar/ScheduleBar.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ScheduleBar_ScheduleBar});var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.zo.div.withConfig({shouldForwardProp:prop=>!["id","scheduleId","schedule","calendarSize","level","row","column","duration","roundedStart","roundedEnd","mode"].includes(prop)})`
  position: absolute;
  ${({calendarSize,level})=>"md"===calendarSize?styled_components_browser_esm.iv`
        top: ${18*level+36}px;
        height: 16px;
      `:"sm"===calendarSize?styled_components_browser_esm.iv`
        top: ${14*level+22}px;
        height: 12px;
      `:void 0}

  left: ${({column})=>100*column/7}%;
  width: ${({duration})=>100*duration/7}%;
  padding: ${({roundedStart,roundedEnd})=>`0 ${roundedEnd?"4px":0} 0 ${roundedStart?"4px":0}`};
`,Inner=styled_components_browser_esm.zo.div.withConfig({shouldForwardProp:prop=>!["id","scheduleId","schedule","row","column","duration","level","roundedStart","roundedEnd","teamPlaceColor","mode"].includes(prop)})`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  padding-left: 6px;

  background-color: ${({theme,teamPlaceColor=0,mode})=>"indicator"===mode?"transparent":theme.teamColor[teamPlaceColor]};
  border-radius: ${({roundedStart,roundedEnd})=>`${roundedStart?"4px":"0"} ${roundedEnd?"4px 4px":"0 0"} ${roundedStart?"4px":"0"}`};

  ${({mode,theme})=>"indicator"===mode&&styled_components_browser_esm.iv`
      margin-top: -2px;

      border: 2px solid ${theme.color.GRAY400};

      box-shadow: 0 0 24px ${theme.color.GRAY600};
      box-sizing: content-box;
    `};

  ${({mode,level})=>"indicator"!==mode&&styled_components_browser_esm.iv`
      filter: brightness(${1+.4*level});
    `};

  ${({mode})=>"normal"===mode&&styled_components_browser_esm.iv`
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    `};
`,scheduleBarTitle=calendarSize=>styled_components_browser_esm.iv`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 100px;
  height: 100%;

  font-size: ${"md"===calendarSize?12:10}px;
  color: ${({theme})=>theme.color.WHITE};
`;var svg=__webpack_require__("./src/assets/svg/index.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScheduleBar=props=>{const{title,onClick,roundedEnd,onDragStart,mode="normal",calendarSize="md",...rest}=props,{teamPlaceColor}=(0,useTeamPlace.l)(),isInteractive="normal"===mode,isIndicator="indicator"===mode;return(0,jsx_runtime.jsx)(Wrapper,{title:isInteractive?title:void 0,onClick,onDragStart,roundedEnd,calendarSize,draggable:isInteractive,mode,...rest,children:(0,jsx_runtime.jsxs)(Inner,{teamPlaceColor,roundedEnd,mode,...rest,children:[!isIndicator&&(0,jsx_runtime.jsx)(Text.Z,{as:"span",css:scheduleBarTitle(calendarSize),children:title}),!roundedEnd&&!isIndicator&&(0,jsx_runtime.jsx)(svg.yr,{})]})})};ScheduleBar.displayName="ScheduleBar";const ScheduleBar_ScheduleBar=ScheduleBar;try{ScheduleBar.displayName="ScheduleBar",ScheduleBar.__docgenInfo={description:"",displayName:"ScheduleBar",props:{onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => void)"}},onDragStart:{defaultValue:null,description:"",name:"onDragStart",required:!1,type:{name:"((e: MouseEvent<Element, MouseEvent>) => void)"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},scheduleId:{defaultValue:null,description:"",name:"scheduleId",required:!0,type:{name:"number"}},schedule:{defaultValue:null,description:"",name:"schedule",required:!0,type:{name:"Schedule"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},row:{defaultValue:null,description:"",name:"row",required:!0,type:{name:"number"}},column:{defaultValue:null,description:"",name:"column",required:!0,type:{name:"number"}},duration:{defaultValue:null,description:"",name:"duration",required:!0,type:{name:"number"}},level:{defaultValue:null,description:"",name:"level",required:!0,type:{name:"number"}},roundedStart:{defaultValue:null,description:"",name:"roundedStart",required:!0,type:{name:"boolean"}},roundedEnd:{defaultValue:null,description:"",name:"roundedEnd",required:!0,type:{name:"boolean"}},calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},mode:{defaultValue:null,description:"",name:"mode",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"no-interaction"'},{value:'"indicator"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleBar/ScheduleBar.tsx#ScheduleBar"]={docgenInfo:ScheduleBar.__docgenInfo,name:"ScheduleBar",path:"src/components/team_calendar/ScheduleBar/ScheduleBar.tsx#ScheduleBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useTeamPlace.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>useTeamPlace});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contexts/TeamPlaceContext.tsx");const useTeamPlace=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__.Q);if(void 0===context)throw new Error("useTeamPlace must be used within a TeamPlaceContext");return context}}}]);
//# sourceMappingURL=components-team_calendar-ScheduleBar-ScheduleBar-stories.5e1ce03a.iframe.bundle.js.map