"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9557],{"./node_modules/@tanstack/react-query/build/lib/useMutation.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>useMutation});var react=__webpack_require__("./node_modules/react/index.js"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),mutation=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/mutation.mjs"),notifyManager=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs"),subscribable=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");class MutationObserver extends subscribable.l{constructor(client,options){super(),this.client=client,this.setOptions(options),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(options){var _this$currentMutation;const prevOptions=this.options;this.options=this.client.defaultMutationOptions(options),(0,utils.VS)(prevOptions,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(_this$currentMutation=this.currentMutation)||_this$currentMutation.setOptions(this.options)}onUnsubscribe(){var _this$currentMutation2;this.hasListeners()||(null==(_this$currentMutation2=this.currentMutation)||_this$currentMutation2.removeObserver(this))}onMutationUpdate(action){this.updateResult();const notifyOptions={listeners:!0};"success"===action.type?notifyOptions.onSuccess=!0:"error"===action.type&&(notifyOptions.onError=!0),this.notify(notifyOptions)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(variables,options){return this.mutateOptions=options,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:void 0!==variables?variables:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){const state=this.currentMutation?this.currentMutation.state:(0,mutation.R)(),result={...state,isLoading:"loading"===state.status,isSuccess:"success"===state.status,isError:"error"===state.status,isIdle:"idle"===state.status,mutate:this.mutate,reset:this.reset};this.currentResult=result}notify(options){notifyManager.V.batch((()=>{var _this$mutateOptions$o,_this$mutateOptions,_this$mutateOptions$o2,_this$mutateOptions2;if(this.mutateOptions&&this.hasListeners())if(options.onSuccess)null==(_this$mutateOptions$o=(_this$mutateOptions=this.mutateOptions).onSuccess)||_this$mutateOptions$o.call(_this$mutateOptions,this.currentResult.data,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o2=(_this$mutateOptions2=this.mutateOptions).onSettled)||_this$mutateOptions$o2.call(_this$mutateOptions2,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context);else if(options.onError){var _this$mutateOptions$o3,_this$mutateOptions3,_this$mutateOptions$o4,_this$mutateOptions4;null==(_this$mutateOptions$o3=(_this$mutateOptions3=this.mutateOptions).onError)||_this$mutateOptions$o3.call(_this$mutateOptions3,this.currentResult.error,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o4=(_this$mutateOptions4=this.mutateOptions).onSettled)||_this$mutateOptions$o4.call(_this$mutateOptions4,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context)}options.listeners&&this.listeners.forEach((({listener})=>{listener(this.currentResult)}))}))}}var useSyncExternalStore=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),lib_utils=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/utils.mjs");function useMutation(arg1,arg2,arg3){const options=(0,utils.lV)(arg1,arg2,arg3),queryClient=(0,QueryClientProvider.NL)({context:options.context}),[observer]=react.useState((()=>new MutationObserver(queryClient,options)));react.useEffect((()=>{observer.setOptions(options)}),[observer,options]);const result=(0,useSyncExternalStore.$)(react.useCallback((onStoreChange=>observer.subscribe(notifyManager.V.batchCalls(onStoreChange))),[observer]),(()=>observer.getCurrentResult()),(()=>observer.getCurrentResult())),mutate=react.useCallback(((variables,mutateOptions)=>{observer.mutate(variables,mutateOptions).catch(noop)}),[observer]);if(result.error&&(0,lib_utils.L)(observer.options.useErrorBoundary,[result.error]))throw result.error;return{...result,mutate,mutateAsync:result.mutate}}function noop(){}},"./src/components/team_calendar/ScheduleModal/ScheduleModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _components_team_calendar_ScheduleModal_ScheduleModal__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/team_calendar/ScheduleModal/ScheduleModal.tsx"),_hooks_useModal__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/hooks/useModal.ts"),_utils_arrayOf__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/utils/arrayOf.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Schedule/ScheduleModal",component:_components_team_calendar_ScheduleModal_ScheduleModal__WEBPACK_IMPORTED_MODULE_0__.Z},SampleModal=()=>{const{openModal}=(0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_1__.d)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,{children:[(0,_utils_arrayOf__WEBPACK_IMPORTED_MODULE_3__.C)(5).map(((_,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{onClick:()=>{openModal()},children:"모달 열기"},index))),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_team_calendar_ScheduleModal_ScheduleModal__WEBPACK_IMPORTED_MODULE_0__.Z,{calendarWidth:1e3,calendarLeft:200,scheduleId:1,position:{row:0,column:0,level:0},onOpenScheduleEditModal:()=>{alert("onOpenScheduleEditModal")}})]})},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SampleModal,{}),args:{calendarWidth:1e3,calendarLeft:200,scheduleId:1,position:{row:0,column:0,level:0}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <SampleModal />,\n  args: {\n    calendarWidth: 1000,\n    calendarLeft: 200,\n    scheduleId: 1,\n    position: {\n      row: 0,\n      column: 0,\n      level: 0\n    }\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/apis/schedule.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Rd:()=>fetchSchedules,Tg:()=>modifySchedule,Yx:()=>fetchICalendarUrl,e4:()=>fetchScheduleById,ie:()=>fetchMySchedules,wV:()=>sendSchedule,wn:()=>deleteSchedule});var _apis_http__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/http.ts");const fetchSchedules=(teamPlaceId,startDate,endDate)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.get(`/api/team-place/${teamPlaceId}/calendar/schedules?startDate=${startDate}&endDate=${endDate}`),fetchMySchedules=(startDate,endDate)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.get(`/api/my-calendar/schedules?startDate=${startDate}&endDate=${endDate}`),fetchScheduleById=(teamPlaceId,scheduleId)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.get(`/api/team-place/${teamPlaceId}/calendar/schedules/${scheduleId}`),fetchICalendarUrl=teamPlaceId=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.get(`/api/team-place/${teamPlaceId}/icalendar-url`),deleteSchedule=(teamPlaceId,scheduleId)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.delete(`/api/team-place/${teamPlaceId}/calendar/schedules/${scheduleId}`),sendSchedule=(teamPlaceId,body)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.post(`/api/team-place/${teamPlaceId}/calendar/schedules`,body),modifySchedule=(teamPlaceId,scheduleId,body)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.patch(`/api/team-place/${teamPlaceId}/calendar/schedules/${scheduleId}`,body)},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.PRIMARY};
    color: ${({theme})=>theme.color.WHITE};
  `,normal:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.WHITE};
    color: ${({theme})=>theme.color.GRAY900};
    border: 1px solid ${({theme})=>theme.color.GRAY300};
  `,plain:styled_components_browser_esm.iv`
    background-color: transparent;
    color: ${({theme})=>theme.color.GRAY900};
  `},ButtonWrapper=styled_components_browser_esm.zo.button.withConfig({shouldForwardProp:prop=>!["css","variant","size"].includes(prop)})`
  font-size: 16px;
  line-height: 16px;
  text-align: center;

  ${({size="md"})=>styled_components_browser_esm.iv`
      padding: ${paddingSize[size]};
    `};

  ${({variant="primary"})=>variants[variant]};

  ${({variant="primary"})=>{if("plain"!==variant)return styled_components_browser_esm.iv`
        &:disabled {
          opacity: 0.6;
        }

        &:not([disabled]):hover {
          opacity: 0.8;
        }

        border-radius: 4px;

        transition: 0.2s;
      `}};

  ${props=>props.css}
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Modal/Modal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Modal_Modal});var react_dom=__webpack_require__("./node_modules/react-dom/index.js"),useModal=__webpack_require__("./src/hooks/useModal.ts"),react=__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Modal=props=>{const{children}=props,{isModalOpen,closeModal}=(0,useModal.d)();var triggerKey,callback;return triggerKey="Escape",callback=closeModal,(0,react.useEffect)((()=>{const handleKeydown=e=>{e.key===triggerKey&&callback()};return document.addEventListener("keydown",handleKeydown),()=>{document.removeEventListener("keydown",handleKeydown)}}),[callback,triggerKey]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:isModalOpen&&(0,react_dom.createPortal)((0,jsx_runtime.jsx)("div",{role:"dialog","aria-modal":!0,children}),document.body)})},Modal_Modal=Modal;try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/Modal.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/Modal.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team/TeamBadge/TeamBadge.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TeamBadge_TeamBadge});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.zo.div.withConfig({shouldForwardProp:prop=>!["teamPlaceColor","size"].includes(prop)})`
  ${({size})=>"sm"===size?styled_components_browser_esm.iv`
        width: 6px;
        height: 6px;
      `:"lg"===size?styled_components_browser_esm.iv`
        width: 24px;
        height: 24px;
      `:styled_components_browser_esm.iv`
      width: 20px;
      height: 20px;
    `}

  border-radius: 50%;
  background-color: ${({theme,teamPlaceColor})=>theme.teamColor[teamPlaceColor]};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TeamBadge=props=>{const{teamPlaceColor,size="md"}=props;return(0,jsx_runtime.jsx)(Wrapper,{teamPlaceColor,size})};TeamBadge.displayName="TeamBadge";const TeamBadge_TeamBadge=TeamBadge;try{TeamBadge.displayName="TeamBadge",TeamBadge.__docgenInfo={description:"",displayName:"TeamBadge",props:{teamPlaceColor:{defaultValue:null,description:"",name:"teamPlaceColor",required:!0,type:{name:"enum",value:[{value:"0"},{value:"1"},{value:"2"},{value:"3"},{value:"4"},{value:"5"},{value:"6"},{value:"7"},{value:"8"},{value:"9"},{value:"100"}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team/TeamBadge/TeamBadge.tsx#TeamBadge"]={docgenInfo:TeamBadge.__docgenInfo,name:"TeamBadge",path:"src/components/team/TeamBadge/TeamBadge.tsx#TeamBadge"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/ScheduleModal/ScheduleModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ScheduleModal_ScheduleModal});var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),useModal=__webpack_require__("./src/hooks/useModal.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: ${({theme})=>theme.zIndex.MODAL};
  gap: 28px;

  ${({$isMobile})=>$isMobile?styled_components_browser_esm.iv`
        width: 300px;
        padding: 10px 10px 20px 26px;
      `:styled_components_browser_esm.iv`
      width: 551px;
      height: 272px;
      padding: 20px 30px 30px 40px;
    `}

  border-radius: 10px;
  background-color: ${({theme})=>theme.color.WHITE};

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;

  ${({$css})=>$css};
`,Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`,Header=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,TeamWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  gap: 12px;
`,MenuContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`,PeriodWrapper=styled_components_browser_esm.zo.div`
  display: flex;

  gap: 2px;

  ${({$isMobile})=>$isMobile?styled_components_browser_esm.iv`
        flex-direction: column;
      `:styled_components_browser_esm.iv`
      align-items: center;
    `}
`,teamName=styled_components_browser_esm.iv`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 200px;
`,menuIcon=styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  padding: 0;

  border-radius: 8px;

  &:hover {
    background-color: ${({theme})=>theme.color.GRAY100};
  }
`,modalLocation=(row,column,level,calendarWidth,calendarLeft,calendarSize,isMobile)=>isMobile?styled_components_browser_esm.iv`
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);
    `:"md"===calendarSize?styled_components_browser_esm.iv`
      position: absolute;
      top: ${(row<3?92:-199)+110*(row+1)+18*level}px;
      left: ${(column>3?calendarWidth/7-550:3===column?calendarWidth/14-275:0)+calendarLeft+calendarWidth*column/7}px;
    `:"sm"==calendarSize?styled_components_browser_esm.iv`
      position: fixed;
      top: 26%;
      left: 12%;
    `:void 0,scheduleTitleText=styled_components_browser_esm.iv`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  width: 100%;
`;var svg=__webpack_require__("./src/assets/svg/index.ts"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),schedule=__webpack_require__("./src/apis/schedule.ts");var QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs");var TeamBadge=__webpack_require__("./src/components/team/TeamBadge/TeamBadge.tsx"),useToast=__webpack_require__("./src/hooks/useToast.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),getIsMobile=__webpack_require__("./src/utils/getIsMobile.ts");const formatDateTime=rawDateTime=>{const[rawDate,time]=rawDateTime.split(" "),date=rawDate.split("-");return`${date[0]}년 ${date[1]}월 ${date[2]}일 ${time}`},generateDateTimeRangeDescription=(startDateTime,endDateTime)=>{const[startDate]=startDateTime.split(" "),[endDate,endTime]=endDateTime.split(" "),formattedStartDateTime=formatDateTime(startDateTime),formattedEndDateTime=formatDateTime(endDateTime),formattedStartDate=formattedStartDateTime.split(" ").slice(0,3).join(" "),formattedEndDate=formattedEndDateTime.split(" ").slice(0,3).join(" ");return startDateTime===endDateTime?formattedStartDateTime:"23:59"===endTime?startDate===endDate?formattedStartDate:`${formattedStartDate} ~ ${formattedEndDate}`:`${formattedStartDateTime} ~ ${formattedEndDateTime}`};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScheduleModal=props=>{const{calendarWidth,calendarLeft,scheduleId,position,onOpenScheduleEditModal,calendarSize="md"}=props,{closeModal}=(0,useModal.d)(),{showToast}=(0,useToast.p)(),{teamPlaceColor,teamPlaceId,displayName}=(0,useTeamPlace.l)(),isMobile=(0,getIsMobile.W)(),{scheduleById}=((teamPlaceId,scheduleId)=>{const{data:scheduleById}=(0,useQuery.a)(["schedule",teamPlaceId,scheduleId],(()=>(0,schedule.e4)(teamPlaceId,scheduleId)),{enabled:teamPlaceId>0});return{scheduleById}})(teamPlaceId,scheduleId),{mutateDeleteSchedule}=((teamPlaceId,scheduleId)=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate}=(0,useMutation.D)((()=>(0,schedule.wn)(teamPlaceId,scheduleId)),{onSuccess:()=>{queryClient.invalidateQueries(["schedules",teamPlaceId]),queryClient.removeQueries(["schedule",teamPlaceId,scheduleId]),queryClient.invalidateQueries(["mySchedules"]),queryClient.invalidateQueries(["myDailySchedules"])},onError:()=>{throw alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요."),new Error}});return{mutateDeleteSchedule:mutate}})(teamPlaceId,scheduleId);if(void 0===scheduleById)return;const{title,startDateTime,endDateTime}=scheduleById,{row,column,level}=position;return(0,jsx_runtime.jsxs)(Modal.Z,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{$isMobile:isMobile,$css:modalLocation(row,column,level,calendarWidth,calendarLeft,calendarSize,isMobile),children:[(0,jsx_runtime.jsxs)(Header,{children:[(0,jsx_runtime.jsxs)(TeamWrapper,{children:[(0,jsx_runtime.jsx)(TeamBadge.Z,{teamPlaceColor,size:"lg"}),!isMobile&&(0,jsx_runtime.jsx)("div",{title:displayName,children:(0,jsx_runtime.jsx)(Text.Z,{css:teamName,children:displayName})})]}),(0,jsx_runtime.jsxs)(MenuContainer,{children:[(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",onClick:onOpenScheduleEditModal,css:menuIcon,children:(0,jsx_runtime.jsx)(svg.dY,{})}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",onClick:()=>{confirm("일정을 삭제하시겠어요?")&&mutateDeleteSchedule(void 0,{onSuccess:()=>{showToast("success","일정이 삭제되었습니다."),closeModal()}})},css:menuIcon,children:(0,jsx_runtime.jsx)(svg.pJ,{})}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",onClick:closeModal,css:menuIcon,children:(0,jsx_runtime.jsx)(svg.Tw,{})})]})]}),(0,jsx_runtime.jsx)(Text.Z,{size:"xxl",weight:"bold",css:scheduleTitleText,children:title}),(0,jsx_runtime.jsx)(PeriodWrapper,{$isMobile:isMobile,children:(0,jsx_runtime.jsx)("time",{children:(0,jsx_runtime.jsx)(Text.Z,{size:"lg",children:generateDateTimeRangeDescription(startDateTime,endDateTime)})})}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"primary",css:($isMobile=isMobile,styled_components_browser_esm.iv`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  width: 96px;
  height: 42px;
  ${$isMobile&&styled_components_browser_esm.iv`
    margin-right: 10px;
  `}
  padding: 10px 30px;

  cursor: pointer;
`),onClick:closeModal,children:"확인"})]})]});var $isMobile};ScheduleModal.displayName="ScheduleModal";const ScheduleModal_ScheduleModal=ScheduleModal;try{ScheduleModal.displayName="ScheduleModal",ScheduleModal.__docgenInfo={description:"",displayName:"ScheduleModal",props:{calendarWidth:{defaultValue:null,description:"",name:"calendarWidth",required:!0,type:{name:"number"}},calendarLeft:{defaultValue:null,description:"",name:"calendarLeft",required:!0,type:{name:"number"}},calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},scheduleId:{defaultValue:null,description:"",name:"scheduleId",required:!0,type:{name:"number"}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"SchedulePosition"}},onOpenScheduleEditModal:{defaultValue:null,description:"",name:"onOpenScheduleEditModal",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleModal/ScheduleModal.tsx#ScheduleModal"]={docgenInfo:ScheduleModal.__docgenInfo,name:"ScheduleModal",path:"src/components/team_calendar/ScheduleModal/ScheduleModal.tsx#ScheduleModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useModal.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useModal});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Modal/ModalContext.tsx");const useModal=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__.t);if(void 0===context)throw new Error("useModal must be used within a ModalProvider");return context}},"./src/hooks/useTeamPlace.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>useTeamPlace});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contexts/TeamPlaceContext.tsx");const useTeamPlace=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__.Q);if(void 0===context)throw new Error("useTeamPlace must be used within a TeamPlaceContext");return context}},"./src/hooks/useToast.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>useToast});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Toast/ToastContext.tsx");const useToast=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__.u);if(void 0===context)throw new Error("useToast must be used within a ToastProvider");return context}},"./src/utils/arrayOf.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>arrayOf});const arrayOf=count=>[...new Array(count).keys()]},"./src/utils/getIsMobile.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>getIsMobile});const getIsMobile=()=>{const isIos=null!==window.navigator.userAgent.match(/ipad|iphone/i),isAndroid=null!==window.navigator.userAgent.match(/Android/i);return!(!isIos&&!isAndroid)}}}]);
//# sourceMappingURL=components-team_calendar-ScheduleModal-ScheduleModal-stories.81b9fe79.iframe.bundle.js.map