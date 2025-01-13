"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1065],{"./src/components/user/AccountDeleteModal/AccountDeleteModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _AccountDeleteModal__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/user/AccountDeleteModal/AccountDeleteModal.tsx"),_hooks_useModal__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/hooks/useModal.ts"),_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/common/Button/Button.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"user/AccountDeleteModal",component:_AccountDeleteModal__WEBPACK_IMPORTED_MODULE_0__.A,tags:["autodocs"],parameters:{docs:{description:{component:"`AccountDeleteModal` 는 계정 탈퇴 진행을 위한 모달입니다."}}}},SampleModal=()=>{const{openModal}=(0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_1__.h)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__.A,{onClick:openModal,children:"모달 열기"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_AccountDeleteModal__WEBPACK_IMPORTED_MODULE_0__.A,{})]})},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(SampleModal,{}),args:{}},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <SampleModal />,\n  args: {}\n}",...Default.parameters?.docs?.source}}}},"./node_modules/@tanstack/react-query/build/lib/useMutation.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>useMutation});var react=__webpack_require__("./node_modules/react/index.js"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),mutation=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/mutation.mjs"),notifyManager=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs"),subscribable=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");class MutationObserver extends subscribable.Q{constructor(client,options){super(),this.client=client,this.setOptions(options),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(options){var _this$currentMutation;const prevOptions=this.options;this.options=this.client.defaultMutationOptions(options),(0,utils.f8)(prevOptions,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(_this$currentMutation=this.currentMutation)||_this$currentMutation.setOptions(this.options)}onUnsubscribe(){var _this$currentMutation2;this.hasListeners()||(null==(_this$currentMutation2=this.currentMutation)||_this$currentMutation2.removeObserver(this))}onMutationUpdate(action){this.updateResult();const notifyOptions={listeners:!0};"success"===action.type?notifyOptions.onSuccess=!0:"error"===action.type&&(notifyOptions.onError=!0),this.notify(notifyOptions)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(variables,options){return this.mutateOptions=options,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:void 0!==variables?variables:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){const state=this.currentMutation?this.currentMutation.state:(0,mutation.$)(),result={...state,isLoading:"loading"===state.status,isSuccess:"success"===state.status,isError:"error"===state.status,isIdle:"idle"===state.status,mutate:this.mutate,reset:this.reset};this.currentResult=result}notify(options){notifyManager.j.batch((()=>{var _this$mutateOptions$o,_this$mutateOptions,_this$mutateOptions$o2,_this$mutateOptions2;if(this.mutateOptions&&this.hasListeners())if(options.onSuccess)null==(_this$mutateOptions$o=(_this$mutateOptions=this.mutateOptions).onSuccess)||_this$mutateOptions$o.call(_this$mutateOptions,this.currentResult.data,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o2=(_this$mutateOptions2=this.mutateOptions).onSettled)||_this$mutateOptions$o2.call(_this$mutateOptions2,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context);else if(options.onError){var _this$mutateOptions$o3,_this$mutateOptions3,_this$mutateOptions$o4,_this$mutateOptions4;null==(_this$mutateOptions$o3=(_this$mutateOptions3=this.mutateOptions).onError)||_this$mutateOptions$o3.call(_this$mutateOptions3,this.currentResult.error,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o4=(_this$mutateOptions4=this.mutateOptions).onSettled)||_this$mutateOptions$o4.call(_this$mutateOptions4,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context)}options.listeners&&this.listeners.forEach((({listener})=>{listener(this.currentResult)}))}))}}var useSyncExternalStore=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),lib_utils=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/utils.mjs");function useMutation(arg1,arg2,arg3){const options=(0,utils.GR)(arg1,arg2,arg3),queryClient=(0,QueryClientProvider.jE)({context:options.context}),[observer]=react.useState((()=>new MutationObserver(queryClient,options)));react.useEffect((()=>{observer.setOptions(options)}),[observer,options]);const result=(0,useSyncExternalStore.r)(react.useCallback((onStoreChange=>observer.subscribe(notifyManager.j.batchCalls(onStoreChange))),[observer]),(()=>observer.getCurrentResult()),(()=>observer.getCurrentResult())),mutate=react.useCallback(((variables,mutateOptions)=>{observer.mutate(variables,mutateOptions).catch(noop)}),[observer]);if(result.error&&(0,lib_utils.G)(observer.options.useErrorBoundary,[result.error]))throw result.error;return{...result,mutate,mutateAsync:result.mutate}}function noop(){}},"./src/apis/user.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ci:()=>deleteUserAccount,UX:()=>modifyUserInfo,me:()=>fetchUserInfo});var _apis_http__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/http.ts");const fetchUserInfo=()=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.L.get("/api/me"),modifyUserInfo=body=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.L.patch("/api/me",body),deleteUserAccount=()=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.L.delete("/api/me/account")},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.AH`
    background-color: ${({theme})=>theme.color.PRIMARY};
    color: ${({theme})=>theme.color.WHITE};
  `,normal:styled_components_browser_esm.AH`
    background-color: ${({theme})=>theme.color.WHITE};
    color: ${({theme})=>theme.color.GRAY900};
    border: 1px solid ${({theme})=>theme.color.GRAY300};
  `,plain:styled_components_browser_esm.AH`
    background-color: transparent;
    color: ${({theme})=>theme.color.GRAY900};
  `},ButtonWrapper=styled_components_browser_esm.I4.button.withConfig({shouldForwardProp:prop=>!["css","variant","size"].includes(prop)})`
  font-size: 16px;
  line-height: 16px;
  text-align: center;

  ${({size="md"})=>styled_components_browser_esm.AH`
      padding: ${paddingSize[size]};
    `};

  ${({variant="primary"})=>variants[variant]};

  ${({variant="primary"})=>{if("plain"!==variant)return styled_components_browser_esm.AH`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})},Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Input/Input.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Input_Input});const InputWrapper=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").I4.input.withConfig({shouldForwardProp:prop=>!["width","height","css"].includes(prop)})`
  width: ${({width})=>width};
  height: ${({height})=>height};
  padding: 6px;

  border: 1px solid ${({theme})=>theme.color.GRAY200};

  font-size: 14px;

  && {
    ${props=>props.css}
  }
`;var react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Input=(0,react.forwardRef)(((props,ref)=>{const{width,height,css,...rest}=props;return(0,jsx_runtime.jsx)(InputWrapper,{width,height,css,ref,...rest})}));Input.displayName="Input";const Input_Input=Input;try{Input.displayName="Input",Input.__docgenInfo={description:"",displayName:"Input",props:{css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"string"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Input/Input.tsx#Input"]={docgenInfo:Input.__docgenInfo,name:"Input",path:"src/components/common/Input/Input.tsx#Input"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Modal/Modal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Modal_Modal});var react_dom=__webpack_require__("./node_modules/react-dom/index.js"),useModal=__webpack_require__("./src/hooks/useModal.ts"),react=__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Modal=props=>{const{children}=props,{isModalOpen,closeModal}=(0,useModal.h)();var triggerKey,callback;return triggerKey="Escape",callback=closeModal,(0,react.useEffect)((()=>{const handleKeydown=e=>{e.key===triggerKey&&callback()};return document.addEventListener("keydown",handleKeydown),()=>{document.removeEventListener("keydown",handleKeydown)}}),[callback,triggerKey]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:isModalOpen&&(0,react_dom.createPortal)((0,jsx_runtime.jsx)("div",{role:"dialog","aria-modal":!0,children}),document.body)})},Modal_Modal=Modal;try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/Modal.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/Modal.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.I4.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})},Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/user/AccountDeleteModal/AccountDeleteModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>AccountDeleteModal_AccountDeleteModal});var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Input=__webpack_require__("./src/components/common/Input/Input.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.I4.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);
`,Container=styled_components_browser_esm.I4.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: ${({theme})=>theme.zIndex.MODAL};

  width: 490px;
  max-width: 100%;
  padding: 24px;
  row-gap: 24px;

  border-radius: 12px;
  background-color: ${({theme})=>theme.color.WHITE};

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;

  transform: translate(-50%, -50%);
`,ModalHeader=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 38px;

  border-bottom: ${({theme})=>`1px solid ${theme.color.GRAY300}`};
`,ModalBody=styled_components_browser_esm.I4.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`,WarningBox=styled_components_browser_esm.I4.div`
  padding: 16px;

  border-radius: 4px;
  background-color: ${({theme})=>theme.color.GRAY100};

  & ul > li {
    margin: 0 0 6px 16px;

    list-style: initial;
  }

  & ul > li::marker {
    color: ${({theme})=>theme.color.GRAY700};
  }
`,Username=styled_components_browser_esm.I4.span`
  color: ${({theme})=>theme.color.PRIMARY};
`,AccountDeleteForm=styled_components_browser_esm.I4.form`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`,closeButton=styled_components_browser_esm.AH`
  width: 32px;
  height: 38px;
  padding: 0;
`,deleteConfirmInput=styled_components_browser_esm.AH`
  padding: 0 10px;

  font-size: 16px;

  border-radius: 4px;
  border: 1px solid ${({theme})=>theme.color.GRAY400};
`,accountDeleteButton=styled_components_browser_esm.AH`
  width: 100%;

  background-color: ${({theme})=>theme.color.RED};
`;var user=__webpack_require__("./src/constants/user.ts"),useModal=__webpack_require__("./src/hooks/useModal.ts"),react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),constants_localStorage=__webpack_require__("./src/constants/localStorage.ts"),routes=__webpack_require__("./src/constants/routes.ts"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),apis_user=__webpack_require__("./src/apis/user.ts");var useFetchUserInfo=__webpack_require__("./src/hooks/queries/useFetchUserInfo.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),useToken=__webpack_require__("./src/hooks/useToken.ts");const useAccountDeleteModal=()=>{const{userInfo}=(0,useFetchUserInfo.z)(),{mutateDeleteUserAccount}=(()=>{const{mutate}=(0,useMutation.n)((()=>(0,apis_user.Ci)()));return{mutateDeleteUserAccount:mutate}})(),[inputValue,setInputValue]=(0,react.useState)(""),navigate=(0,dist.Zp)(),{showToast}=(0,useToast.d)(),{resetToken}=(0,useToken.r)();return{username:userInfo?.name,inputValue,isDeleteButtonDisabled:inputValue!==user.F,handlers:{handleInputValueChange:e=>{setInputValue((()=>e.target.value))},handleDeleteAccountSubmit:e=>{e.preventDefault(),inputValue!==user.F&&(alert("탈퇴를 위해 정확한 문구를 입력하세요"),setInputValue((()=>""))),mutateDeleteUserAccount(void 0,{onSuccess:()=>{alert("정상적으로 회원탈퇴 되었습니다."),resetToken(),localStorage.removeItem(constants_localStorage.C.TEAM_PLACE_ID),navigate(routes.K.LANDING)},onError:()=>{showToast("error","탈퇴가 실패했습니다. 다시 시도해주세요")}})}}}};var svg=__webpack_require__("./src/assets/svg/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const AccountDeleteModal_AccountDeleteModal=()=>{const{closeModal}=(0,useModal.h)(),{username,inputValue,isDeleteButtonDisabled,handlers:{handleInputValueChange,handleDeleteAccountSubmit}}=useAccountDeleteModal();return(0,jsx_runtime.jsxs)(Modal.A,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(ModalHeader,{children:(0,jsx_runtime.jsx)(Button.A,{variant:"plain",type:"button",css:closeButton,onClick:closeModal,"aria-label":"회원 탈퇴 모달 닫기",children:(0,jsx_runtime.jsx)(svg.CloseIcon,{})})}),(0,jsx_runtime.jsxs)(ModalBody,{children:[(0,jsx_runtime.jsxs)(Text.A,{size:"xxl",weight:"bold",children:[(0,jsx_runtime.jsx)(Username,{children:username}),"님을 떠나보내야 한다니 아쉬워요."]}),(0,jsx_runtime.jsx)(Text.A,{size:"lg",children:"회원 탈퇴 전, 아래의 유의사항을 읽어 주세요."}),(0,jsx_runtime.jsx)(WarningBox,{children:(0,jsx_runtime.jsxs)("ul",{children:[(0,jsx_runtime.jsx)("li",{children:"소속된 모든 팀에서 자동으로 나가집니다."}),(0,jsx_runtime.jsx)("li",{children:"회원 정보는 영구적으로 삭제되며, 복구할 수 없게 됩니다."})]})}),(0,jsx_runtime.jsxs)(Text.A,{size:"lg",children:["유의사항을 모두 확인하셨고, 회원 탈퇴를 원하신다면 하단의 입력창에"," ",(0,jsx_runtime.jsx)("b",{children:user.F}),"를 입력해 주세요."]})]}),(0,jsx_runtime.jsxs)(AccountDeleteForm,{onSubmit:handleDeleteAccountSubmit,children:[(0,jsx_runtime.jsx)(Input.A,{width:"100%",height:"40px",placeholder:`'${user.F}' 를 입력해 주세요.`,css:deleteConfirmInput,value:inputValue,onChange:handleInputValueChange,autoFocus:!0,required:!0}),(0,jsx_runtime.jsx)(Button.A,{disabled:isDeleteButtonDisabled,css:accountDeleteButton,children:"회원 탈퇴하기"})]})]})]})}},"./src/constants/query.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>STALE_TIME});const STALE_TIME={SCHEDULES:3e4,DAILY_SCHEDULES:3e4,MY_SCHEDULES:3e4,MY_DAILY_SCHEDULES:3e4,USER_INFO:3e5,TEAM_PLACE_MEMBERS:6e4,TEAM_PLACE_INVITE_CODE:1/0,TEAM_LINKS:6e4,TEAM_FEED:3e5,ICALENDAR_URL:1/0}},"./src/constants/routes.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>PATH_NAME});const PATH_NAME={LANDING:"/",POLICY:"/policy",LOGIN:"/login",START:"/start",JOIN:"/join",CREATE:"/create",TEAM_SELECT:"/team",TEAM_OVERVIEW:"/team/overview",TEAM_CALENDAR:"/team/calendar",TEAM_FEED:"/team/feed",TEAM_LINK:"/team/link"}},"./src/constants/user.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>ACCOUNT_DELETE_CONFIRM_TEXT,O:()=>MAX_USER_NAME_LENGTH});const MAX_USER_NAME_LENGTH=20,ACCOUNT_DELETE_CONFIRM_TEXT="탈퇴합니다"},"./src/hooks/queries/useFetchUserInfo.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>useFetchUserInfo});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),_apis_user__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/user.ts"),_constants_query__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/query.ts");const useFetchUserInfo=()=>{const{data}=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.I)(["userInfo"],_apis_user__WEBPACK_IMPORTED_MODULE_0__.me,{staleTime:_constants_query__WEBPACK_IMPORTED_MODULE_1__.S.USER_INFO});return{userInfo:data}}},"./src/hooks/useModal.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h:()=>useModal});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Modal/ModalContext.tsx");const useModal=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__.V);if(void 0===context)throw new Error("useModal must be used within a ModalProvider");return context}},"./src/hooks/useToast.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useToast});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Toast/ToastContext.tsx");const useToast=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__.$);if(void 0===context)throw new Error("useToast must be used within a ToastProvider");return context}},"./src/hooks/useToken.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>useToken});var react=__webpack_require__("./node_modules/react/index.js");__webpack_require__("./src/constants/localStorage.ts"),__webpack_require__("./node_modules/react/jsx-runtime.js");const TokenContext=(0,react.createContext)({}),TokenProvider=({children})=>{const[accessToken,setAccessToken]=useState((()=>localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)??"")),[refreshToken,setRefreshToken]=useState((()=>localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN)??"")),value={accessToken,refreshToken,updateToken:(accessToken,refreshToken)=>{setAccessToken((()=>accessToken??"")),setRefreshToken((()=>refreshToken??"")),localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN,accessToken),localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN,refreshToken)},resetToken:()=>{setAccessToken((()=>"")),setRefreshToken((()=>"")),localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN),localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN)}};return _jsx(TokenContext.Provider,{value,children})};try{TokenProvider.displayName="TokenProvider",TokenProvider.__docgenInfo={description:"",displayName:"TokenProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/contexts/TokenContext.tsx#TokenProvider"]={docgenInfo:TokenProvider.__docgenInfo,name:"TokenProvider",path:"src/contexts/TokenContext.tsx#TokenProvider"})}catch(__react_docgen_typescript_loader_error){}const useToken=()=>{const context=(0,react.useContext)(TokenContext);if(void 0===context)throw new Error("useToken must be used within a TokenContext");return context}}}]);
//# sourceMappingURL=components-user-AccountDeleteModal-AccountDeleteModal-stories.53c8954c.iframe.bundle.js.map