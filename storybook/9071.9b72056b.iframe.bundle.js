"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9071],{"./node_modules/@tanstack/react-query/build/lib/useMutation.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>useMutation});var react=__webpack_require__("./node_modules/react/index.js"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),mutation=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/mutation.mjs"),notifyManager=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs"),subscribable=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");class MutationObserver extends subscribable.l{constructor(client,options){super(),this.client=client,this.setOptions(options),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(options){var _this$currentMutation;const prevOptions=this.options;this.options=this.client.defaultMutationOptions(options),(0,utils.VS)(prevOptions,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(_this$currentMutation=this.currentMutation)||_this$currentMutation.setOptions(this.options)}onUnsubscribe(){var _this$currentMutation2;this.hasListeners()||(null==(_this$currentMutation2=this.currentMutation)||_this$currentMutation2.removeObserver(this))}onMutationUpdate(action){this.updateResult();const notifyOptions={listeners:!0};"success"===action.type?notifyOptions.onSuccess=!0:"error"===action.type&&(notifyOptions.onError=!0),this.notify(notifyOptions)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(variables,options){return this.mutateOptions=options,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:void 0!==variables?variables:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){const state=this.currentMutation?this.currentMutation.state:(0,mutation.R)(),result={...state,isLoading:"loading"===state.status,isSuccess:"success"===state.status,isError:"error"===state.status,isIdle:"idle"===state.status,mutate:this.mutate,reset:this.reset};this.currentResult=result}notify(options){notifyManager.V.batch((()=>{var _this$mutateOptions$o,_this$mutateOptions,_this$mutateOptions$o2,_this$mutateOptions2;if(this.mutateOptions&&this.hasListeners())if(options.onSuccess)null==(_this$mutateOptions$o=(_this$mutateOptions=this.mutateOptions).onSuccess)||_this$mutateOptions$o.call(_this$mutateOptions,this.currentResult.data,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o2=(_this$mutateOptions2=this.mutateOptions).onSettled)||_this$mutateOptions$o2.call(_this$mutateOptions2,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context);else if(options.onError){var _this$mutateOptions$o3,_this$mutateOptions3,_this$mutateOptions$o4,_this$mutateOptions4;null==(_this$mutateOptions$o3=(_this$mutateOptions3=this.mutateOptions).onError)||_this$mutateOptions$o3.call(_this$mutateOptions3,this.currentResult.error,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o4=(_this$mutateOptions4=this.mutateOptions).onSettled)||_this$mutateOptions$o4.call(_this$mutateOptions4,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context)}options.listeners&&this.listeners.forEach((({listener})=>{listener(this.currentResult)}))}))}}var useSyncExternalStore=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),lib_utils=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/utils.mjs");function useMutation(arg1,arg2,arg3){const options=(0,utils.lV)(arg1,arg2,arg3),queryClient=(0,QueryClientProvider.NL)({context:options.context}),[observer]=react.useState((()=>new MutationObserver(queryClient,options)));react.useEffect((()=>{observer.setOptions(options)}),[observer,options]);const result=(0,useSyncExternalStore.$)(react.useCallback((onStoreChange=>observer.subscribe(notifyManager.V.batchCalls(onStoreChange))),[observer]),(()=>observer.getCurrentResult()),(()=>observer.getCurrentResult())),mutate=react.useCallback(((variables,mutateOptions)=>{observer.mutate(variables,mutateOptions).catch(noop)}),[observer]);if(result.error&&(0,lib_utils.L)(observer.options.useErrorBoundary,[result.error]))throw result.error;return{...result,mutate,mutateAsync:result.mutate}}function noop(){}},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.PRIMARY};
    color: ${({theme})=>theme.color.WHITE};
  `,normal:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.WHITE};
    color: ${({theme})=>theme.color.GRAY900};
    border: 1px solid ${({theme})=>theme.color.GRAY300};
  `,plain:styled_components_browser_esm.iv`
    background-color: transparent;
    color: ${({theme})=>theme.color.GRAY900};
  `},ButtonWrapper=styled_components_browser_esm.zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Input/Input.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Input_Input});const InputWrapper=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.input`
  width: ${({width})=>width};
  height: ${({height})=>height};
  padding: 6px;

  border: 1px solid ${({theme})=>theme.color.GRAY200};

  font-size: 14px;

  && {
    ${props=>props.css}
  }
`;var react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Input=(0,react.forwardRef)(((props,ref)=>{const{width,height,css,...rest}=props;return(0,jsx_runtime.jsx)(InputWrapper,{width,height,css,ref,...rest})}));Input.displayName="Input";const Input_Input=Input;try{Input.displayName="Input",Input.__docgenInfo={description:"",displayName:"Input",props:{css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"string"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Input/Input.tsx#Input"]={docgenInfo:Input.__docgenInfo,name:"Input",path:"src/components/common/Input/Input.tsx#Input"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Modal/Modal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Modal_Modal});var react_dom=__webpack_require__("./node_modules/react-dom/index.js"),useModal=__webpack_require__("./src/hooks/useModal.ts"),react=__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Modal=props=>{const{children}=props,{isModalOpen,closeModal}=(0,useModal.d)();var triggerKey,callback;return triggerKey="Escape",callback=closeModal,(0,react.useEffect)((()=>{const handleKeydown=e=>{e.key===triggerKey&&callback()};return document.addEventListener("keydown",handleKeydown),()=>{document.removeEventListener("keydown",handleKeydown)}}),[callback,triggerKey]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:isModalOpen&&(0,react_dom.createPortal)((0,jsx_runtime.jsx)("div",{role:"dialog","aria-modal":!0,children}),document.body)})},Modal_Modal=Modal;try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/Modal.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/Modal.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team/TeamBadge/TeamBadge.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TeamBadge_TeamBadge});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TeamBadge=props=>{const{teamPlaceColor,size="md"}=props;return(0,jsx_runtime.jsx)(Wrapper,{teamPlaceColor,size})};TeamBadge.displayName="TeamBadge";const TeamBadge_TeamBadge=TeamBadge;try{TeamBadge.displayName="TeamBadge",TeamBadge.__docgenInfo={description:"",displayName:"TeamBadge",props:{teamPlaceColor:{defaultValue:null,description:"",name:"teamPlaceColor",required:!0,type:{name:"enum",value:[{value:"0"},{value:"1"},{value:"2"},{value:"3"},{value:"4"},{value:"5"},{value:"6"},{value:"7"},{value:"8"},{value:"9"},{value:"100"}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team/TeamBadge/TeamBadge.tsx#TeamBadge"]={docgenInfo:TeamBadge.__docgenInfo,name:"TeamBadge",path:"src/components/team/TeamBadge/TeamBadge.tsx#TeamBadge"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team/TeamExitModal/TeamExitModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TeamExitModal_TeamExitModal});var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Input=__webpack_require__("./src/components/common/Input/Input.tsx"),react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),routes=__webpack_require__("./src/constants/routes.ts"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),team=__webpack_require__("./src/apis/team.ts");var useModal=__webpack_require__("./src/hooks/useModal.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts");const team_useTeamExitModal=onClose=>{const navigate=(0,dist.s0)(),{teamPlaces,teamPlaceId,displayName,resetTeamPlace}=(0,useTeamPlace.l)(),{showToast}=(0,useToast.p)(),{closeModal}=(0,useModal.d)(),{mutateDeleteTeamPlace}=(teamPlaceId=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate}=(0,useMutation.D)((()=>(0,team.Lr)(teamPlaceId)),{onSuccess:()=>{queryClient.clear()}});return{mutateDeleteTeamPlace:mutate}})(teamPlaceId),[teamName,setTeamName]=(0,react.useState)(""),handleClose=()=>{setTeamName((()=>"")),closeModal()};return{teamName,displayName,handlers:{handleTeamNameChange:e=>{const{target}=e;setTeamName((()=>target.value))},handleSubmit:e=>{if(e.preventDefault(),teamName.trim()!==displayName)return void showToast("error","탈퇴하려는 팀 이름과 일치하지 않습니다.");confirm("정말 팀을 탈퇴하시겠어요? \n 해당 작업은 되돌릴 수 없습니다.")&&mutateDeleteTeamPlace(void 0,{onSuccess:()=>{resetTeamPlace(),onClose(),handleClose(),showToast("success","팀 탈퇴가 완료되었습니다."),1!==teamPlaces.length?navigate(routes.y.TEAM_SELECT):navigate(routes.y.START)}})},handleClose}}};var svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: ${({theme})=>theme.zIndex.MODAL};

  width: 500px;
  min-height: 280px;
  padding: 20px 30px;

  border-radius: 10px;
  background-color: ${({theme})=>theme.color.WHITE};
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;

  transform: translate(-50%, -50%);
`,Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`,Header=styled_components_browser_esm.zo.div`
  display: flex;

  border-bottom: ${({theme})=>`1px solid ${theme.color.GRAY300}`};
`,Body=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  margin-top: 20px;
  row-gap: 36px;

  & > label {
    display: flex;
    flex-direction: column;
    align-items: center;

    row-gap: 36px;
  }
`,ButtonContainer=styled_components_browser_esm.zo.div`
  display: flex;

  column-gap: 10px;
  margin-left: auto;
`,exitButton=styled_components_browser_esm.iv`
  display: flex;
  align-items: center;

  padding: 8px;
  gap: 2px;
  margin: 0 auto;
`,strongContent=styled_components_browser_esm.iv`
  text-decoration: underline;
`,closeButton=styled_components_browser_esm.iv`
  width: 22px;
  height: 38px;
  padding: 8px 0;

  margin-left: auto;
`,cancelButton=styled_components_browser_esm.iv`
  width: 90px;

  background-color: ${({theme})=>theme.color.GRAY500};
`,exitConfirmButton=styled_components_browser_esm.iv`
  width: 90px;

  background-color: ${({theme})=>theme.color.RED};
`,teamNameInput=styled_components_browser_esm.iv`
  padding: 0 10px;

  font-size: 16px;

  border-radius: 4px;
  border: 1px solid ${({theme})=>theme.color.GRAY400};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TeamExitModal=props=>{const{onClose}=props,{openModal}=(0,useModal.d)(),{teamName,displayName,handlers:{handleTeamNameChange,handleSubmit,handleClose}}=team_useTeamExitModal(onClose);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)(Button.Z,{type:"button",variant:"normal",onClick:openModal,css:exitButton,children:["팀 나가기",(0,jsx_runtime.jsx)(svg.R0,{})]}),(0,jsx_runtime.jsxs)(Modal.Z,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:handleClose}),(0,jsx_runtime.jsx)("form",{onSubmit:handleSubmit,children:(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Header,{children:(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",onClick:handleClose,css:closeButton,children:(0,jsx_runtime.jsx)(svg.Tw,{})})}),(0,jsx_runtime.jsxs)(Body,{children:[(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsxs)(Text.Z,{as:"span",size:"lg",children:["팀 탈퇴를 위해"," ",(0,jsx_runtime.jsx)(Text.Z,{as:"strong",size:"lg",weight:"semiBold",css:strongContent,children:displayName}),"을(를) 입력해 주세요."]}),(0,jsx_runtime.jsx)(Input.Z,{width:"340px",height:"40px",placeholder:displayName,css:teamNameInput,autoFocus:!0,required:!0,value:teamName,onChange:handleTeamNameChange})]}),(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(Button.Z,{type:"button",css:cancelButton,onClick:handleClose,children:"취소"}),(0,jsx_runtime.jsx)(Button.Z,{disabled:teamName!==displayName,css:exitConfirmButton,children:"확인"})]})]})]})})]})]})},TeamExitModal_TeamExitModal=TeamExitModal;try{TeamExitModal.displayName="TeamExitModal",TeamExitModal.__docgenInfo={description:"",displayName:"TeamExitModal",props:{onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team/TeamExitModal/TeamExitModal.tsx#TeamExitModal"]={docgenInfo:TeamExitModal.__docgenInfo,name:"TeamExitModal",path:"src/components/team/TeamExitModal/TeamExitModal.tsx#TeamExitModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team/TeamPlaceInfoModal/TeamPlaceInfoModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TeamPlaceInfoModal_TeamPlaceInfoModal});var react=__webpack_require__("./node_modules/react/index.js"),Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),TeamExitModal=__webpack_require__("./src/components/team/TeamExitModal/TeamExitModal.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),TeamBadge=__webpack_require__("./src/components/team/TeamBadge/TeamBadge.tsx"),Input=__webpack_require__("./src/components/common/Input/Input.tsx"),ModalContext=__webpack_require__("./src/components/common/Modal/ModalContext.tsx"),useModal=__webpack_require__("./src/hooks/useModal.ts"),user=__webpack_require__("./src/constants/user.ts"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),team=__webpack_require__("./src/apis/team.ts");var QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs");var useClickOutside=__webpack_require__("./src/hooks/useClickOutside.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts");const getMe=members=>members.find((member=>member.isMe)),getMeFirstMembers=members=>{const me=getMe(members),others=members.filter((member=>!1===member.isMe));return me?[me,...others]:others},useTeamPlaceInfoModal=()=>{const{teamPlaceId,teamPlaceColor,displayName}=(0,useTeamPlace.l)(),{showToast}=(0,useToast.p)(),{members}=(teamPlaceId=>{const{data}=(0,useQuery.a)(["teamPlaceMembers",teamPlaceId],(()=>(0,team.b9)(teamPlaceId)),{enabled:teamPlaceId>0}),{members}=data??{};return{members}})(teamPlaceId),{inviteCode}=(teamPlaceId=>{const{data}=(0,useQuery.a)(["teamPlaceInviteCode",teamPlaceId],(()=>(0,team.rH)(teamPlaceId)),{enabled:teamPlaceId>0}),{teamPlaceId:id,inviteCode}=data??{};return{id,inviteCode}})(teamPlaceId),{mutateModifyMyTeamPlaceUserInfo}=(teamPlaceId=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate}=(0,useMutation.D)((body=>(0,team.ND)(teamPlaceId,body)),{onSuccess:()=>{queryClient.invalidateQueries(["teamPlaceMembers"])}});return{mutateModifyMyTeamPlaceUserInfo:mutate}})(teamPlaceId),[isEditing,setIsEditing]=(0,react.useState)(!1),[myUserName,setMyUserName]=(0,react.useState)(""),myUserInfoRef=(0,react.useRef)(null);(0,useClickOutside.Z)(myUserInfoRef,(()=>{setIsEditing((()=>!1))}));return(0,react.useEffect)((()=>{const me=getMe(members??[]);me&&setMyUserName((()=>me.name))}),[members,isEditing]),{teamPlaceId,teamPlaceColor,displayName,members:getMeFirstMembers(members??[]),inviteCode,isEditing,myUserName,myUserInfoRef,handlers:{handleCopyButtonClick:()=>{if(inviteCode)try{navigator.clipboard.writeText(inviteCode),showToast("success","초대 코드가 복사되었습니다.")}catch(error){showToast("error","초대 코드 복사에 실패했습니다.")}},handleMyUserInfoSubmit:e=>{e.preventDefault();const name=myUserName.trim(),previousName=getMe(members??[])?.name;""!==name&&name!==previousName?name.length>user.O?showToast("error",`닉네임은 최대 ${user.O}자까지 입력할 수 있습니다.`):mutateModifyMyTeamPlaceUserInfo({name:myUserName},{onSuccess:()=>{setIsEditing((()=>!1)),showToast("success","닉네임이 변경되었습니다.")},onError:()=>{showToast("error","닉네임 변경에 실패했습니다.")}}):setIsEditing((()=>!1))},handleMyUserNameChange:e=>{e.target.value.length<=user.O&&setMyUserName((()=>e.target.value))},handleUserInfoEditButtonClick:()=>{setIsEditing((()=>!0))}}}};var svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`,Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 20px;
  z-index: ${({theme})=>theme.zIndex.MODAL};

  width: 320px;
  height: 500px;
  padding: 20px 30px;

  border-radius: 8px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({theme})=>theme.color.WHITE};

  overflow: hidden;
`,TeamPlaceName=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;

  gap: 8px;
  margin-bottom: 10px;
`,MemberDescription=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
`,MemberList=styled_components_browser_esm.zo.ul`
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;

  max-height: 240px;
  margin: 20px 0 20px 0;
`,MemberListItem=styled_components_browser_esm.zo.li`
  display: flex;
  align-items: center;

  height: 50px;
  padding: 8px;
  column-gap: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid ${({theme})=>theme.color.GRAY300};
  }
`,ProfileImage=styled_components_browser_esm.zo.img`
  width: 32px;
  height: 32px;

  border-radius: 50%;
  object-fit: cover;
`,InviteCodeContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid ${({theme})=>theme.color.GRAY300};
  border-radius: 8px;

  margin: 10px 0 20px 0;
`,InviteCodeWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80%;
  height: 40px;
  padding: 0 8px;
`,Divider=styled_components_browser_esm.zo.div`
  width: 100%;
  height: 1px;

  margin-bottom: 20px;

  background-color: ${({theme})=>theme.color.GRAY400};
`,MyUserInfo=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;

  width: 100%;
  column-gap: 10px;
`,Badge=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  border-radius: 50%;
  background-color: ${({theme})=>theme.color.GRAY600};

  color: ${({theme})=>theme.color.WHITE};
`,MyUserInfoForm=styled_components_browser_esm.zo.form`
  display: flex;
  align-items: center;

  width: 100%;
`,UserNameInputContainer=styled_components_browser_esm.zo.div`
  width: 160px;

  border: 1px solid ${({theme})=>theme.color.GRAY200};
  border-radius: 4px;
`,teamName=styled_components_browser_esm.iv`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 200px;
`,copyButton=styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 40px;
  padding: 0;

  background-color: ${({theme})=>theme.color.GRAY100};
  border-radius: 0 8px 8px 0;
`,userInfoEditButton=styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;
  padding: 2px;
  margin-left: auto;

  border-radius: 50%;

  &:hover {
    background-color: ${({theme})=>theme.color.GRAY200};
  }
`,userInfoSubmitButton=styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;
  padding: 2px;
  margin-left: auto;

  border-radius: 50%;

  &:hover {
    background-color: ${({theme})=>theme.color.GRAY200};
  }
`,userNameLength=styled_components_browser_esm.iv`
  font-size: 12px;
  color: ${({theme})=>theme.color.GRAY600};
  white-space: pre;
`,userNameInput=styled_components_browser_esm.iv`
  border: none;
  border-radius: 4px;

  &:focus {
    outline: none;
  }
`,userName=styled_components_browser_esm.iv`
  max-width: 120px;

  font-weight: 500;

  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
  text-align: center;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TeamPlaceInfoModal_TeamPlaceInfoModal=()=>{const{closeModal}=(0,useModal.d)(),{teamPlaceColor,displayName,members,inviteCode,isEditing,myUserName,myUserInfoRef,handlers:{handleCopyButtonClick,handleMyUserInfoSubmit,handleMyUserNameChange,handleUserInfoEditButtonClick}}=useTeamPlaceInfoModal();return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsxs)(Modal.Z,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(TeamPlaceName,{children:[(0,jsx_runtime.jsx)(TeamBadge.Z,{teamPlaceColor,size:"md"}),(0,jsx_runtime.jsx)(Text.Z,{as:"span",size:"lg",weight:"semiBold",css:teamName,children:displayName})]}),(0,jsx_runtime.jsx)(Divider,{}),(0,jsx_runtime.jsxs)(MemberDescription,{children:[(0,jsx_runtime.jsx)(Text.Z,{as:"span",weight:"semiBold",children:"팀원 목록"}),(0,jsx_runtime.jsxs)(Text.Z,{as:"span",children:["총 ",members.length,"명"]})]}),(0,jsx_runtime.jsx)(MemberList,{children:members.map((member=>{const{id,name,profileImageUrl,isMe}=member;return isMe?(0,jsx_runtime.jsx)(react.Fragment,{children:(0,jsx_runtime.jsxs)(MemberListItem,{children:[(0,jsx_runtime.jsx)(ProfileImage,{src:profileImageUrl,alt:name}),isEditing?(0,jsx_runtime.jsx)(MyUserInfoForm,{onSubmit:handleMyUserInfoSubmit,children:(0,jsx_runtime.jsxs)(MyUserInfo,{ref:myUserInfoRef,children:[(0,jsx_runtime.jsxs)(UserNameInputContainer,{children:[(0,jsx_runtime.jsx)(Input.Z,{width:"120px",height:"100%",placeholder:name,value:myUserName,onChange:handleMyUserNameChange,minLength:1,maxLength:user.O,css:userNameInput,autoFocus:!0}),(0,jsx_runtime.jsx)(Text.Z,{as:"span",css:userNameLength,children:`${myUserName.length}/${user.O}`})]}),(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",css:userInfoSubmitButton,children:(0,jsx_runtime.jsx)(svg.yZ,{})})]})}):(0,jsx_runtime.jsxs)(MyUserInfo,{children:[(0,jsx_runtime.jsx)(Text.Z,{as:"span",css:userName,children:name}),(0,jsx_runtime.jsx)(Badge,{children:(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",as:"span",size:"xs",children:"나"})}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain","aria-label":"닉네임 수정하기",css:userInfoEditButton,onClick:handleUserInfoEditButtonClick,children:(0,jsx_runtime.jsx)(svg.dY,{})})]})]})},id):(0,jsx_runtime.jsx)(react.Fragment,{children:(0,jsx_runtime.jsxs)(MemberListItem,{children:[(0,jsx_runtime.jsx)(ProfileImage,{src:profileImageUrl,alt:name}),(0,jsx_runtime.jsx)(Text.Z,{as:"span",children:name})]})},id)}))}),(0,jsx_runtime.jsx)(Divider,{}),(0,jsx_runtime.jsx)(Text.Z,{as:"span",weight:"semiBold",children:"초대 코드"}),(0,jsx_runtime.jsxs)(InviteCodeContainer,{children:[(0,jsx_runtime.jsx)(InviteCodeWrapper,{children:(0,jsx_runtime.jsx)(Text.Z,{as:"span",size:"lg",children:inviteCode})}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",css:copyButton,onClick:handleCopyButtonClick,children:(0,jsx_runtime.jsx)(svg.Km,{})})]}),(0,jsx_runtime.jsx)(Divider,{}),(0,jsx_runtime.jsx)(ModalContext.D,{children:(0,jsx_runtime.jsx)(TeamExitModal.Z,{onClose:closeModal})})]})]})})}},"./src/constants/routes.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>PATH_NAME});const PATH_NAME={LANDING:"/",POLICY:"/policy",LOGIN:"/login",START:"/start",JOIN:"/join",CREATE:"/create",TEAM_SELECT:"/team",TEAM_OVERVIEW:"/team/overview",TEAM_CALENDAR:"/team/calendar",TEAM_FEED:"/team/feed",TEAM_LINK:"/team/link"}},"./src/constants/user.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>ACCOUNT_DELETE_CONFIRM_TEXT,O:()=>MAX_USER_NAME_LENGTH});const MAX_USER_NAME_LENGTH=20,ACCOUNT_DELETE_CONFIRM_TEXT="탈퇴합니다"},"./src/hooks/useClickOutside.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const __WEBPACK_DEFAULT_EXPORT__=(ref,callback)=>{(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const handleClickOutside=e=>{ref.current&&!ref.current.contains(e.target)&&callback(e)};return document.addEventListener("mousedown",handleClickOutside),document.addEventListener("touchstart",handleClickOutside),()=>{document.removeEventListener("mousedown",handleClickOutside),document.removeEventListener("touchstart",handleClickOutside)}}),[callback,ref])}},"./src/hooks/useModal.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useModal});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Modal/ModalContext.tsx");const useModal=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__.t);if(void 0===context)throw new Error("useModal must be used within a ModalProvider");return context}},"./src/hooks/useTeamPlace.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>useTeamPlace});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contexts/TeamPlaceContext.tsx");const useTeamPlace=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__.Q);if(void 0===context)throw new Error("useTeamPlace must be used within a TeamPlaceContext");return context}},"./src/hooks/useToast.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>useToast});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Toast/ToastContext.tsx");const useToast=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__.u);if(void 0===context)throw new Error("useToast must be used within a ToastProvider");return context}}}]);
//# sourceMappingURL=9071.9b72056b.iframe.bundle.js.map