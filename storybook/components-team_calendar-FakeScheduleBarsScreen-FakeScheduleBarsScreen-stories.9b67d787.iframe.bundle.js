"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9154],{"./src/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{IndicatorMode:()=>IndicatorMode,ScheduleMode:()=>ScheduleMode,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _components_team_calendar_FakeScheduleBarsScreen_FakeScheduleBarsScreen__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Schedule/FakeScheduleBarsScreen",component:_components_team_calendar_FakeScheduleBarsScreen_FakeScheduleBarsScreen__WEBPACK_IMPORTED_MODULE_0__.Z,tags:["autodocs"],decorators:[Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{position:"relative",overflow:"hidden",width:"600px",height:"450px",border:"3px solid red"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})})],argTypes:{mode:{description:"이 컴포넌트의 모드를 의미합니다. 사용 목적에 따라 `schedule`과 `indicator` 중 하나를 명시해 주세요."},scheduleBars:{description:"렌더링할 스케줄 바들의 정보를 의미합니다."},relativeX:{description:"기존 좌표에서 좌우로 얼마나 이동한 위치에 렌더링 시킬 것인지를 의미합니다. 이 값이 양수이면 기존 좌표에서 수치만큼 오른쪽으로 이동하여 렌더링되고, 음수일 경우 왼쪽으로 이동하여 렌더링됩니다. 단위는 픽셀(px)입니다. **이 프로퍼티는 `mode = schedule`일 때만 사용할 수 있습니다.**"},relativeY:{description:"기존 좌표에서 상하로 얼마나 이동한 위치에 렌더링 시킬 것인지를 의미합니다. 이 값이 양수이면 기존 좌표에서 수치만큼 아래쪽으로 이동하여 렌더링되고, 음수일 경우 위쪽으로 이동하여 렌더링됩니다. 단위는 픽셀(px)입니다. **이 프로퍼티는 `mode = schedule`일 때만 사용할 수 있습니다.**"}},parameters:{docs:{description:{component:"`FakeScheduleBarsScreen` 는 캘린더 바의 드래그 기능을 구현하기 위해 사용자에게 보여주는 가짜 캘린더 바로 구성된, 시각적인 컴포넌트입니다.\n\n`mode = schedule`일 경우, 마우스 조작을 통해 x, y 값을 계속해서 업데이트하면 마우스를 따라다니듯이 작동하도록 만들 수 있습니다. x, y 값을 변경하면서 컴포넌트의 변화를 테스트하세요."}}}},scheduleBars=[{id:"1",scheduleId:1105,title:"바쁜 필립의 3주짜리 일정",row:0,column:1,duration:6,level:0,roundedStart:!0,roundedEnd:!1,schedule:{id:1105,title:"바쁜 필립의 3주짜리 일정",startDateTime:"2023-06-26 00:00",endDateTime:"2023-07-12 23:59"}},{id:"2",scheduleId:1105,title:"바쁜 필립의 3주짜리 일정",row:1,column:0,duration:7,level:0,roundedStart:!1,roundedEnd:!1,schedule:{id:1105,title:"바쁜 필립의 3주짜리 일정",startDateTime:"2023-06-26 00:00",endDateTime:"2023-07-12 23:59"}},{id:"3",scheduleId:1105,title:"바쁜 필립의 3주짜리 일정",row:2,column:0,duration:4,level:0,roundedStart:!1,roundedEnd:!0,schedule:{id:1105,title:"바쁜 필립의 3주짜리 일정",startDateTime:"2023-06-26 00:00",endDateTime:"2023-07-12 23:59"}}],ScheduleMode={args:{mode:"schedule",scheduleBars,relativeX:0,relativeY:0}},IndicatorMode={args:{mode:"indicator",scheduleBars}};ScheduleMode.parameters={...ScheduleMode.parameters,docs:{...ScheduleMode.parameters?.docs,source:{originalSource:"{\n  args: {\n    mode: 'schedule',\n    scheduleBars,\n    relativeX: 0,\n    relativeY: 0\n  }\n}",...ScheduleMode.parameters?.docs?.source},description:{story:"이 모드는 가짜 스케줄 바를 보여줘야 할 경우에 사용합니다.",...ScheduleMode.parameters?.docs?.description}}},IndicatorMode.parameters={...IndicatorMode.parameters,docs:{...IndicatorMode.parameters?.docs,source:{originalSource:"{\n  args: {\n    mode: 'indicator',\n    scheduleBars\n  }\n}",...IndicatorMode.parameters?.docs?.source},description:{story:"이 모드는 스케줄 바가 놓일 위치를 시각적으로 보여줘야 할 경우에 사용합니다.",...IndicatorMode.parameters?.docs?.description}}};const __namedExportsOrder=["ScheduleMode","IndicatorMode"];try{ScheduleMode.displayName="ScheduleMode",ScheduleMode.__docgenInfo={description:"이 모드는 가짜 스케줄 바를 보여줘야 할 경우에 사용합니다.",displayName:"ScheduleMode",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen.stories.tsx#ScheduleMode"]={docgenInfo:ScheduleMode.__docgenInfo,name:"ScheduleMode",path:"src/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen.stories.tsx#ScheduleMode"})}catch(__react_docgen_typescript_loader_error){}try{IndicatorMode.displayName="IndicatorMode",IndicatorMode.__docgenInfo={description:"이 모드는 스케줄 바가 놓일 위치를 시각적으로 보여줘야 할 경우에 사용합니다.",displayName:"IndicatorMode",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen.stories.tsx#IndicatorMode"]={docgenInfo:IndicatorMode.__docgenInfo,name:"IndicatorMode",path:"src/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen.stories.tsx#IndicatorMode"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>FakeScheduleBarsScreen_FakeScheduleBarsScreen});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div.attrs((({$relativeX,$relativeY})=>({style:{transform:`translate(${$relativeX}px, ${$relativeY}px)`}})))`
  display: flex;
  flex-direction: column;
  position: absolute;

  width: 100%;
  height: 100%;
`,CalendarRow=styled_components_browser_esm.zo.div`
  position: relative;
  flex-grow: 1;
`;var ScheduleBar=__webpack_require__("./src/components/team_calendar/ScheduleBar/ScheduleBar.tsx"),arrayOf=__webpack_require__("./src/utils/arrayOf.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const FakeScheduleBarsScreen=props=>{const{mode,scheduleBars}=props;return(0,jsx_runtime.jsx)(Container,{$relativeX:"schedule"===mode?props.relativeX:0,$relativeY:"schedule"===mode?props.relativeY:0,children:(0,arrayOf.C)(6).map(((_,rowIndex)=>(0,jsx_runtime.jsx)(CalendarRow,{children:scheduleBars.map((scheduleBar=>scheduleBar.row===rowIndex?(0,jsx_runtime.jsx)(ScheduleBar.Z,{...scheduleBar,mode:"schedule"===mode?"no-interaction":"indicator"},scheduleBar.id):null))},rowIndex)))})};FakeScheduleBarsScreen.displayName="FakeScheduleBarsScreen";const FakeScheduleBarsScreen_FakeScheduleBarsScreen=FakeScheduleBarsScreen;try{FakeScheduleBarsScreen.displayName="FakeScheduleBarsScreen",FakeScheduleBarsScreen.__docgenInfo={description:"",displayName:"FakeScheduleBarsScreen",props:{mode:{defaultValue:null,description:"",name:"mode",required:!0,type:{name:"enum",value:[{value:'"schedule"'},{value:'"indicator"'}]}},scheduleBars:{defaultValue:null,description:"",name:"scheduleBars",required:!0,type:{name:"GeneratedScheduleBar[]"}},relativeX:{defaultValue:null,description:"",name:"relativeX",required:!0,type:{name:"number"}},relativeY:{defaultValue:null,description:"",name:"relativeY",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen.tsx#FakeScheduleBarsScreen"]={docgenInfo:FakeScheduleBarsScreen.__docgenInfo,name:"FakeScheduleBarsScreen",path:"src/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen.tsx#FakeScheduleBarsScreen"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/ScheduleBar/ScheduleBar.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ScheduleBar_ScheduleBar});var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.zo.div.withConfig({shouldForwardProp:prop=>!["id","scheduleId","schedule","calendarSize","level","row","column","duration","roundedStart","roundedEnd","mode"].includes(prop)})`
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
`;var svg=__webpack_require__("./src/assets/svg/index.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScheduleBar=props=>{const{title,onClick,roundedEnd,onDragStart,mode="normal",calendarSize="md",...rest}=props,{teamPlaceColor}=(0,useTeamPlace.l)(),isInteractive="normal"===mode,isIndicator="indicator"===mode;return(0,jsx_runtime.jsx)(Wrapper,{title:isInteractive?title:void 0,onClick,onDragStart,roundedEnd,calendarSize,draggable:isInteractive,mode,...rest,children:(0,jsx_runtime.jsxs)(Inner,{teamPlaceColor,roundedEnd,mode,...rest,children:[!isIndicator&&(0,jsx_runtime.jsx)(Text.Z,{as:"span",css:scheduleBarTitle(calendarSize),children:title}),!roundedEnd&&!isIndicator&&(0,jsx_runtime.jsx)(svg.yr,{})]})})};ScheduleBar.displayName="ScheduleBar";const ScheduleBar_ScheduleBar=ScheduleBar;try{ScheduleBar.displayName="ScheduleBar",ScheduleBar.__docgenInfo={description:"",displayName:"ScheduleBar",props:{onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => void)"}},onDragStart:{defaultValue:null,description:"",name:"onDragStart",required:!1,type:{name:"((e: MouseEvent<Element, MouseEvent>) => void)"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},scheduleId:{defaultValue:null,description:"",name:"scheduleId",required:!0,type:{name:"number"}},schedule:{defaultValue:null,description:"",name:"schedule",required:!0,type:{name:"Schedule"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},row:{defaultValue:null,description:"",name:"row",required:!0,type:{name:"number"}},column:{defaultValue:null,description:"",name:"column",required:!0,type:{name:"number"}},duration:{defaultValue:null,description:"",name:"duration",required:!0,type:{name:"number"}},level:{defaultValue:null,description:"",name:"level",required:!0,type:{name:"number"}},roundedStart:{defaultValue:null,description:"",name:"roundedStart",required:!0,type:{name:"boolean"}},roundedEnd:{defaultValue:null,description:"",name:"roundedEnd",required:!0,type:{name:"boolean"}},calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},mode:{defaultValue:null,description:"",name:"mode",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"no-interaction"'},{value:'"indicator"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleBar/ScheduleBar.tsx#ScheduleBar"]={docgenInfo:ScheduleBar.__docgenInfo,name:"ScheduleBar",path:"src/components/team_calendar/ScheduleBar/ScheduleBar.tsx#ScheduleBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useTeamPlace.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>useTeamPlace});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contexts/TeamPlaceContext.tsx");const useTeamPlace=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__.Q);if(void 0===context)throw new Error("useTeamPlace must be used within a TeamPlaceContext");return context}},"./src/utils/arrayOf.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>arrayOf});const arrayOf=count=>[...new Array(count).keys()]}}]);
//# sourceMappingURL=components-team_calendar-FakeScheduleBarsScreen-FakeScheduleBarsScreen-stories.9b67d787.iframe.bundle.js.map