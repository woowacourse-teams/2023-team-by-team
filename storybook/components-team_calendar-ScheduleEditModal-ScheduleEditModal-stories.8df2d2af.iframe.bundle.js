"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4100],{"./src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _components_team_calendar_ScheduleEditModal_ScheduleEditModal__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.tsx"),_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Button/Button.tsx"),_hooks_useModal__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/hooks/useModal.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Schedule/ScheduleEditModal",component:_components_team_calendar_ScheduleEditModal_ScheduleEditModal__WEBPACK_IMPORTED_MODULE_0__.A,tags:["autodocs"]},SampleModal=()=>{const{openModal}=(0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_2__.h)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_1__.A,{onClick:openModal,children:"모달 열기"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_team_calendar_ScheduleEditModal_ScheduleEditModal__WEBPACK_IMPORTED_MODULE_0__.A,{scheduleId:1,initialSchedule:{id:1,title:"일정 제목",startDateTime:"2023-08-01 00:00",endDateTime:"2023-08-01 00:00"}})]})},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(SampleModal,{}),args:{scheduleId:1,initialSchedule:{id:1,title:"일정 제목",startDateTime:"2023-08-01 00:00",endDateTime:"2023-08-01 00:00"}}},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <SampleModal />,\n  args: {\n    scheduleId: 1,\n    initialSchedule: {\n      id: 1,\n      title: '일정 제목',\n      startDateTime: '2023-08-01 00:00' as YYYYMMDDHHMM,\n      endDateTime: '2023-08-01 00:00' as YYYYMMDDHHMM\n    }\n  }\n}",...Default.parameters?.docs?.source}}}},"./src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ScheduleEditModal_ScheduleEditModal});var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),useModal=__webpack_require__("./src/hooks/useModal.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Backdrop=styled_components_browser_esm.I4.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`,Container=styled_components_browser_esm.I4.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  ${({$calendarSize,$isMobile})=>"md"===$calendarSize||$isMobile?styled_components_browser_esm.AH`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `:"sm"===$calendarSize?styled_components_browser_esm.AH`
        top: 20%;
        left: 13.5%;
      `:void 0}

  ${({$isMobile})=>$isMobile?styled_components_browser_esm.AH`
        width: 300px;
        padding: 10px 26px 20px;
      `:styled_components_browser_esm.AH`
      width: 380px;
      min-height: 300px;
      padding: 16px 20px;
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

    row-gap: 10px;
  }
`,Header=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 30px;
  margin-bottom: 18px;

  border-bottom: ${({theme})=>`1px solid ${theme.color.GRAY300}`};
`,TitleWrapper=styled_components_browser_esm.I4.div`
  width: 100%;
  height: 38px;
`,InnerContainer=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`,ConvenientContainer=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  column-gap: 8px;
`,TimeSelectContainer=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: ${({$isMobile})=>$isMobile?"74px":"40px"};

  ${({$isMobile})=>$isMobile?styled_components_browser_esm.AH`
        flex-direction: column;
        gap: 4px;
      `:styled_components_browser_esm.AH`
      align-items: center;
    `}
`,InputWrapper=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: ${({$isMobile})=>!$isMobile&&"calc(100% - 70px)"};
`,TeamNameContainer=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;

  height: 23px;

  gap: 5px;
`,ControlButtonWrapper=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 38px;
`,DescriptionTextarea=styled_components_browser_esm.I4.textarea`
  display: inline-block;
  width: 100%;
  padding: 6px 10px;

  border: none;
  border-bottom: 1px solid ${theme.A.color.GRAY200};
  border-radius: 10px;

  resize: none;
  font-size: 14px;
  white-space: normal;
  overflow-wrap: break-word;
`,WarnDiv=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: flex-end;
`,title=styled_components_browser_esm.AH`
  padding: 10px 20px;

  border: none;
  border-radius: 10px;
  background-color: ${({theme})=>theme.color.GRAY200};

  font-size: 16px;
`,closeButton=styled_components_browser_esm.AH`
  width: 24px;
  height: 24px;
  padding: 0;
  margin-bottom: 4px;

  svg {
    width: 24px;
    height: 24px;
  }
`,dateTimeLocalInput=(styled_components_browser_esm.AH`
  width: 150px;
  height: 40px;

  border: 1px solid ${({theme})=>theme.color.GRAY200};
  border-radius: 4px;
`,styled_components_browser_esm.AH`
  border-radius: 4px;

  text-align: center;
`),teamPlaceName=styled_components_browser_esm.AH`
  overflow: hidden;

  max-width: 250px;

  text-overflow: ellipsis;
  white-space: nowrap;
`,submitButton=styled_components_browser_esm.AH`
  width: 76px;
  padding: 0;
`,descriptionText=$isDescription=>styled_components_browser_esm.AH`
  color: ${$isDescription?theme.A.color.WHITE:theme.A.color.PRIMARY};
`,errorText=styled_components_browser_esm.AH`
  color: ${theme.A.color.RED};
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),Input=__webpack_require__("./src/components/common/Input/Input.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),useModifySchedule=__webpack_require__("./src/hooks/queries/useModifySchedule.ts"),typeGuard=__webpack_require__("./src/types/typeGuard.ts"),react=__webpack_require__("./node_modules/react/index.js"),useToast=__webpack_require__("./src/hooks/useToast.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),useDateTimeRange=__webpack_require__("./src/hooks/schedule/useDateTimeRange.ts"),calendar=__webpack_require__("./src/constants/calendar.ts");var TeamBadge=__webpack_require__("./src/components/team/TeamBadge/TeamBadge.tsx"),TimeTableMenu=__webpack_require__("./src/components/team_calendar/TimeTableMenu/TimeTableMenu.tsx"),getIsMobile=__webpack_require__("./src/utils/getIsMobile.ts"),Switch=__webpack_require__("./src/components/common/Switch/Switch.tsx"),Svg=__webpack_require__("./src/components/common/Svg/Svg.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScheduleEditModal=props=>{const{scheduleId,initialSchedule,calendarSize="md"}=props,isMobile=(0,getIsMobile.N)(),{closeModal}=(0,useModal.h)(),{teamPlaceColor,displayName}=(0,useTeamPlace.Y)(),{schedule,times,isAllDay,isDescription,isDescriptionMaxLength,handlers:{handleScheduleChange,handleScheduleBlur,handleScheduleSubmit,handleStartTimeChange,handleEndTimeChange,handleIsAllDayChange,handleIsDescription,handleDescriptionInput}}=((scheduleId,initialSchedule)=>{const{title,description,startDate,endDate,startTime,endTime,isValid,isAllDay,handleScheduleChange,handleScheduleBlur,handleStartTimeChange,handleEndTimeChange,handleIsAllDayChange,handleDescriptionChange}=(0,useDateTimeRange.a)(initialSchedule,initialSchedule?.title,initialSchedule?.description??""),[isDescription,setIsDescription]=(0,react.useState)(!!initialSchedule?.description),[isDescriptionMaxLength,setIsDescriptionMaxLength]=(0,react.useState)(!1),{closeModal}=(0,useModal.h)(),{showToast}=(0,useToast.d)(),{teamPlaceId}=(0,useTeamPlace.Y)(),{mutateModifySchedule}=(0,useModifySchedule.d)(teamPlaceId,scheduleId);return{schedule:{title,description,startDate,endDate},times:{startTime,endTime},isAllDay,isDescription,isDescriptionMaxLength,handlers:{handleScheduleChange,handleScheduleBlur,handleScheduleSubmit:e=>{e.preventDefault();const startDateTime=`${startDate} ${startTime}`,endDateTime=`${endDate} ${endTime}`;(0,typeGuard.v)(startDateTime)&&(0,typeGuard.v)(endDateTime)&&(isValid?mutateModifySchedule({title,startDateTime,endDateTime,description},{onSuccess:()=>{showToast("success","일정이 수정되었습니다."),closeModal()},onError:error=>{500===error.status&&showToast("error","일정 제목이 최대 글자(250자)를 초과했습니다.")}}):showToast("error","날짜/시간 형식이 올바르지 않습니다. 올바르게 입력 후 다시 시도해 주세요."))},handleStartTimeChange,handleEndTimeChange,handleIsAllDayChange,handleIsDescription:()=>{setIsDescription((prev=>(prev&&(handleDescriptionChange(""),setIsDescriptionMaxLength(!1)),!prev)))},handleDescriptionInput:e=>{const textarea=e.target;textarea.style.height="auto",textarea.style.height=`${textarea.scrollHeight}px`,textarea.value.length>calendar.Dd?setIsDescriptionMaxLength(!0):setIsDescriptionMaxLength(!1),handleDescriptionChange(textarea.value.slice(0,calendar.Dd))}}}})(scheduleId,initialSchedule);return void 0===initialSchedule?null:(0,jsx_runtime.jsxs)(Modal.A,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{$calendarSize:calendarSize,$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Header,{children:(0,jsx_runtime.jsx)(Button.A,{variant:"plain",type:"button",onClick:closeModal,css:closeButton,"aria-label":"닫기",children:(0,jsx_runtime.jsx)(svg.CloseIcon,{})})}),(0,jsx_runtime.jsxs)("form",{onSubmit:handleScheduleSubmit,children:[(0,jsx_runtime.jsx)(TitleWrapper,{children:(0,jsx_runtime.jsx)(Input.A,{width:"100%",height:"100%",placeholder:"일정 제목",css:title,name:"title",value:schedule.title,required:!0,onChange:handleScheduleChange})}),(0,jsx_runtime.jsxs)(TimeSelectContainer,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Text.A,{weight:"semiBold",children:"일정 시작"}),(0,jsx_runtime.jsxs)(InputWrapper,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Input.A,{width:isAllDay?"100%":"50%",height:"36px",type:"date",css:dateTimeLocalInput,name:"startDate",value:schedule.startDate,onChange:handleScheduleChange,onBlur:handleScheduleBlur,required:!0}),!isAllDay&&(0,jsx_runtime.jsx)(TimeTableMenu.A,{displayValue:times.startTime,onSelect:handleStartTimeChange})]})]}),(0,jsx_runtime.jsxs)(TimeSelectContainer,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Text.A,{weight:"semiBold",children:"일정 마감"}),(0,jsx_runtime.jsxs)(InputWrapper,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Input.A,{width:isAllDay?"100%":"50%",height:"36px",type:"date",css:dateTimeLocalInput,name:"endDate",value:schedule.endDate,min:schedule.startDate,onChange:handleScheduleChange,onBlur:handleScheduleBlur,required:!0}),!isAllDay&&(0,jsx_runtime.jsx)(TimeTableMenu.A,{displayValue:times.endTime,onSelect:handleEndTimeChange})]})]}),(0,jsx_runtime.jsxs)(ConvenientContainer,{children:[(0,jsx_runtime.jsx)(Switch.A,{checked:isAllDay,onChange:handleIsAllDayChange,onLabel:"종일",offLabel:"종일",onColor:theme.A.color.PRIMARY})," ",(0,jsx_runtime.jsx)("p",{className:"hidden","aria-live":"assertive","aria-relevant":"additions",children:isAllDay?"종일 일정이 선택되었습니다.":"종일 일정이 해제되었습니다."}),(0,jsx_runtime.jsxs)(Button.A,{variant:"plain",type:"button",css:($isDescription=isDescription,styled_components_browser_esm.AH`
  display: flex;
  padding: 2px 6px;
  align-items: center;
  border: 1px solid ${theme.A.color.PRIMARY};
  border-radius: 25px;
  background-color: ${$isDescription?theme.A.color.PRIMARY:theme.A.color.WHITE};
`),onClick:handleIsDescription,children:[(0,jsx_runtime.jsx)(Svg.A,{type:"MemoIcon",size:18,fill:isDescription?theme.A.color.WHITE:theme.A.color.PRIMARY}),(0,jsx_runtime.jsx)(Text.A,{css:descriptionText(isDescription),weight:"semiBold",size:"sm",children:"메모"})]})]}),isDescription&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(DescriptionTextarea,{rows:1,placeholder:`메모를 작성해주세요.(최대 ${calendar.Dd}자)`,value:schedule.description,onChange:handleDescriptionInput}),(0,jsx_runtime.jsx)(WarnDiv,{children:isDescriptionMaxLength?(0,jsx_runtime.jsxs)(Text.A,{size:"xs",css:errorText,children:["최대 $",calendar.Dd,"자까지 입력가능합니다."]}):(0,jsx_runtime.jsxs)(Text.A,{size:"xs",children:["(",schedule.description.length," /",calendar.Dd,"자)"]})})]}),(0,jsx_runtime.jsxs)(InnerContainer,{children:[(0,jsx_runtime.jsxs)(TeamNameContainer,{title:displayName,children:[(0,jsx_runtime.jsx)(TeamBadge.A,{teamPlaceColor,size:"lg"}),!isMobile&&(0,jsx_runtime.jsx)(Text.A,{size:"sm",css:teamPlaceName,children:displayName})]}),(0,jsx_runtime.jsx)(ControlButtonWrapper,{children:(0,jsx_runtime.jsx)(Button.A,{variant:"primary",css:submitButton,children:"수정"})})]})]})]})]});var $isDescription},ScheduleEditModal_ScheduleEditModal=ScheduleEditModal;try{ScheduleEditModal.displayName="ScheduleEditModal",ScheduleEditModal.__docgenInfo={description:"",displayName:"ScheduleEditModal",props:{calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},scheduleId:{defaultValue:null,description:"",name:"scheduleId",required:!0,type:{name:"number"}},initialSchedule:{defaultValue:null,description:"",name:"initialSchedule",required:!1,type:{name:"Schedule"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.tsx#ScheduleEditModal"]={docgenInfo:ScheduleEditModal.__docgenInfo,name:"ScheduleEditModal",path:"src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.tsx#ScheduleEditModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/queries/useModifySchedule.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useModifySchedule});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),_apis_schedule__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/schedule.ts");const useModifySchedule=(teamPlaceId,scheduleId)=>{const queryClient=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.jE)(),{mutate}=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.n)((body=>(0,_apis_schedule__WEBPACK_IMPORTED_MODULE_0__.eF)(teamPlaceId,scheduleId,body)),{onSuccess:()=>{queryClient.invalidateQueries(["schedules",teamPlaceId]),queryClient.invalidateQueries(["schedule",teamPlaceId,scheduleId]),queryClient.invalidateQueries(["mySchedules"]),queryClient.invalidateQueries(["myDailySchedules"])}});return{mutateModifySchedule:mutate}}}}]);
//# sourceMappingURL=components-team_calendar-ScheduleEditModal-ScheduleEditModal-stories.8df2d2af.iframe.bundle.js.map