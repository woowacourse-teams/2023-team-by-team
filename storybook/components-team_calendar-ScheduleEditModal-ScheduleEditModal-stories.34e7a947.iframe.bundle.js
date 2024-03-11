"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3589],{"./src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _components_team_calendar_ScheduleEditModal_ScheduleEditModal__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.tsx"),_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Button/Button.tsx"),_hooks_useModal__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/hooks/useModal.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Schedule/ScheduleEditModal",component:_components_team_calendar_ScheduleEditModal_ScheduleEditModal__WEBPACK_IMPORTED_MODULE_0__.Z,tags:["autodocs"]},SampleModal=()=>{const{openModal}=(0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_2__.d)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_1__.Z,{onClick:openModal,children:"모달 열기"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_team_calendar_ScheduleEditModal_ScheduleEditModal__WEBPACK_IMPORTED_MODULE_0__.Z,{scheduleId:1,initialSchedule:{id:1,title:"일정 제목",startDateTime:"2023-08-01 00:00",endDateTime:"2023-08-01 00:00"}})]})},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(SampleModal,{}),args:{scheduleId:1,initialSchedule:{id:1,title:"일정 제목",startDateTime:"2023-08-01 00:00",endDateTime:"2023-08-01 00:00"}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <SampleModal />,\n  args: {\n    scheduleId: 1,\n    initialSchedule: {\n      id: 1,\n      title: '일정 제목',\n      startDateTime: ('2023-08-01 00:00' as YYYYMMDDHHMM),\n      endDateTime: ('2023-08-01 00:00' as YYYYMMDDHHMM)\n    }\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ScheduleEditModal_ScheduleEditModal});var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),useModal=__webpack_require__("./src/hooks/useModal.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`,Container=styled_components_browser_esm.zo.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  ${({$calendarSize,$isMobile})=>"md"===$calendarSize||$isMobile?styled_components_browser_esm.iv`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `:"sm"===$calendarSize?styled_components_browser_esm.iv`
        top: 20%;
        left: 13.5%;
      `:void 0}

  ${({$isMobile})=>$isMobile?styled_components_browser_esm.iv`
        width: 300px;
        padding: 10px 26px 20px;
      `:styled_components_browser_esm.iv`
      width: 400px;
      min-height: 320px;
      padding: 18px 22px;
    `}

  border-radius: 10px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({theme})=>theme.color.WHITE};

  & > form {
    display: flex;
    flex-direction: column;

    row-gap: ${({$isMobile})=>$isMobile?"10px":"16px"};
  }
`,Header=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 34px;
  margin-bottom: 18px;

  border-bottom: ${({theme})=>`1px solid ${theme.color.GRAY300}`};
`,TitleWrapper=styled_components_browser_esm.zo.div`
  width: 100%;
  height: 38px;
`,InnerContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`,CheckboxContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  column-gap: 8px;
`,TimeSelectContainer=styled_components_browser_esm.zo.div`
  display: flex;

  width: 100%;
  height: ${({$isMobile})=>$isMobile?"74px":"40px"};

  ${({$isMobile})=>$isMobile?styled_components_browser_esm.iv`
        flex-direction: column;
        gap: 4px;
      `:styled_components_browser_esm.iv`
      align-items: center;
    `}
`,InputWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: ${({$isMobile})=>!$isMobile&&"calc(100% - 80px)"};

  margin-left: ${({$isMobile})=>!$isMobile&&"auto"};
`,TeamNameContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;

  height: 23px;

  gap: 5px;
`,ControlButtonWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 38px;
`,title=styled_components_browser_esm.iv`
  padding: 10px 20px;

  border: none;
  border-radius: 10px;
  background-color: ${({theme})=>theme.color.GRAY200};

  font-size: 18px;
`,closeButton=styled_components_browser_esm.iv`
  width: 28px;
  height: 28px;
  padding: 0;
  margin-bottom: 4px;

  svg {
    width: 28px;
    height: 28px;
  }
`,dateTimeLocalInput=styled_components_browser_esm.iv`
  border-radius: 4px;

  text-align: center;
`,teamPlaceName=styled_components_browser_esm.iv`
  overflow: hidden;

  max-width: 250px;

  text-overflow: ellipsis;
  white-space: nowrap;
`,submitButton=styled_components_browser_esm.iv`
  width: 80px;
  padding: 0;
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),Input=__webpack_require__("./src/components/common/Input/Input.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),useModifySchedule=__webpack_require__("./src/hooks/queries/useModifySchedule.ts"),typeGuard=__webpack_require__("./src/types/typeGuard.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),useDateTimeRange=__webpack_require__("./src/hooks/schedule/useDateTimeRange.ts");var TeamBadge=__webpack_require__("./src/components/team/TeamBadge/TeamBadge.tsx"),TimeTableMenu=__webpack_require__("./src/components/team_calendar/TimeTableMenu/TimeTableMenu.tsx"),Checkbox=__webpack_require__("./src/components/common/Checkbox/Checkbox.tsx"),getIsMobile=__webpack_require__("./src/utils/getIsMobile.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScheduleEditModal=props=>{const{scheduleId,initialSchedule,calendarSize="md"}=props,isMobile=(0,getIsMobile.W)(),{closeModal}=(0,useModal.d)(),{teamPlaceColor,displayName}=(0,useTeamPlace.l)(),{schedule,times,isAllDay,handlers:{handleScheduleChange,handleScheduleBlur,handleScheduleSubmit,handleStartTimeChange,handleEndTimeChange,handleIsAllDayChange}}=((scheduleId,initialSchedule)=>{const{title,startDate,endDate,startTime,endTime,isValid,isAllDay,handleScheduleChange,handleScheduleBlur,handleStartTimeChange,handleEndTimeChange,handleIsAllDayChange}=(0,useDateTimeRange.u)(initialSchedule,initialSchedule?.title),{closeModal}=(0,useModal.d)(),{showToast}=(0,useToast.p)(),{teamPlaceId}=(0,useTeamPlace.l)(),{mutateModifySchedule}=(0,useModifySchedule.$)(teamPlaceId,scheduleId);return{schedule:{title,startDate,endDate},times:{startTime,endTime},isAllDay,handlers:{handleScheduleChange,handleScheduleBlur,handleScheduleSubmit:e=>{e.preventDefault();const startDateTime=`${startDate} ${startTime}`,endDateTime=`${endDate} ${endTime}`;(0,typeGuard.r)(startDateTime)&&(0,typeGuard.r)(endDateTime)&&(isValid?mutateModifySchedule({title,startDateTime,endDateTime},{onSuccess:()=>{showToast("success","일정이 수정되었습니다."),closeModal()},onError:error=>{500===error.status&&showToast("error","일정 제목이 최대 글자(250자)를 초과했습니다.")}}):showToast("error","날짜/시간 형식이 올바르지 않습니다. 올바르게 입력 후 다시 시도해 주세요."))},handleStartTimeChange,handleEndTimeChange,handleIsAllDayChange}}})(scheduleId,initialSchedule);return void 0===initialSchedule?null:(0,jsx_runtime.jsxs)(Modal.Z,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{$calendarSize:calendarSize,$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Header,{children:(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",onClick:closeModal,css:closeButton,"aria-label":"닫기",children:(0,jsx_runtime.jsx)(svg.Tw,{})})}),(0,jsx_runtime.jsxs)("form",{onSubmit:handleScheduleSubmit,children:[(0,jsx_runtime.jsx)(TitleWrapper,{children:(0,jsx_runtime.jsx)(Input.Z,{width:"100%",height:"100%",placeholder:"일정 제목",css:title,name:"title",value:schedule.title,required:!0,onChange:handleScheduleChange})}),(0,jsx_runtime.jsxs)(TimeSelectContainer,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Text.Z,{size:"lg",weight:"semiBold",children:"일정 시작"}),(0,jsx_runtime.jsxs)(InputWrapper,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Input.Z,{width:isAllDay?"100%":"50%",height:"40px",type:"date",css:dateTimeLocalInput,name:"startDate",value:schedule.startDate,onChange:handleScheduleChange,onBlur:handleScheduleBlur,required:!0}),!isAllDay&&(0,jsx_runtime.jsx)(TimeTableMenu.Z,{displayValue:times.startTime,onSelect:handleStartTimeChange})]})]}),(0,jsx_runtime.jsxs)(TimeSelectContainer,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Text.Z,{size:"lg",weight:"semiBold",children:"일정 마감"}),(0,jsx_runtime.jsxs)(InputWrapper,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Input.Z,{width:isAllDay?"100%":"50%",height:"40px",type:"date",css:dateTimeLocalInput,name:"endDate",value:schedule.endDate,min:schedule.startDate,onChange:handleScheduleChange,onBlur:handleScheduleBlur,required:!0}),!isAllDay&&(0,jsx_runtime.jsx)(TimeTableMenu.Z,{displayValue:times.endTime,onSelect:handleEndTimeChange})]})]}),(0,jsx_runtime.jsxs)(CheckboxContainer,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"md",weight:"semiBold",children:"종일"}),(0,jsx_runtime.jsx)(Checkbox.Z,{size:"sm",isChecked:isAllDay,onChange:handleIsAllDayChange})]}),(0,jsx_runtime.jsxs)(InnerContainer,{children:[(0,jsx_runtime.jsxs)(TeamNameContainer,{title:displayName,children:[(0,jsx_runtime.jsx)(TeamBadge.Z,{teamPlaceColor,size:"lg"}),!isMobile&&(0,jsx_runtime.jsx)(Text.Z,{css:teamPlaceName,children:displayName})]}),(0,jsx_runtime.jsx)(ControlButtonWrapper,{children:(0,jsx_runtime.jsx)(Button.Z,{variant:"primary",css:submitButton,children:"수정"})})]})]})]})]})};ScheduleEditModal.displayName="ScheduleEditModal";const ScheduleEditModal_ScheduleEditModal=ScheduleEditModal;try{ScheduleEditModal.displayName="ScheduleEditModal",ScheduleEditModal.__docgenInfo={description:"",displayName:"ScheduleEditModal",props:{calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},scheduleId:{defaultValue:null,description:"",name:"scheduleId",required:!0,type:{name:"number"}},initialSchedule:{defaultValue:null,description:"",name:"initialSchedule",required:!1,type:{name:"Schedule"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.tsx#ScheduleEditModal"]={docgenInfo:ScheduleEditModal.__docgenInfo,name:"ScheduleEditModal",path:"src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.tsx#ScheduleEditModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/queries/useModifySchedule.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>useModifySchedule});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),_apis_schedule__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/schedule.ts");const useModifySchedule=(teamPlaceId,scheduleId)=>{const queryClient=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.NL)(),{mutate}=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.D)((body=>(0,_apis_schedule__WEBPACK_IMPORTED_MODULE_0__.Tg)(teamPlaceId,scheduleId,body)),{onSuccess:()=>{queryClient.invalidateQueries(["schedules",teamPlaceId]),queryClient.invalidateQueries(["schedule",teamPlaceId,scheduleId]),queryClient.invalidateQueries(["mySchedules"]),queryClient.invalidateQueries(["myDailySchedules"])}});return{mutateModifySchedule:mutate}}}}]);
//# sourceMappingURL=components-team_calendar-ScheduleEditModal-ScheduleEditModal-stories.34e7a947.iframe.bundle.js.map