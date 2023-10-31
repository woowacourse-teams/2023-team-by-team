"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3921],{"./src/components/common/Header/Header.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Header_stories});var react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),react_router_dom_dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Header=styled_components_browser_esm.zo.header`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 64px;
  padding: 0 14px;

  border-bottom: 2px solid ${({theme})=>theme.color.GRAY200};
`,InnerContainer=styled_components_browser_esm.zo.div`
  display: flex;
  column-gap: 20px;

  & > div {
    display: flex;
    align-items: center;
    column-gap: 12px;
  }
`,ButtonContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`,Divider=styled_components_browser_esm.zo.div`
  width: 1px;
  height: 24px;

  background-color: ${({theme})=>theme.color.GRAY500};
`,TeamBadgeEditIconWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;

    color: ${({theme})=>theme.color.WHITE};
  }
`,TeamNameWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
`,ProfileImage=styled_components_browser_esm.zo.img`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  object-fit: cover;
`,teamPlaceInfoButton=(styled_components_browser_esm.iv`
  font-size: 24px;
  font-weight: bold;
`,styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  padding: 0;

  border-radius: 50%;

  &:hover {
    background-color: ${({theme})=>theme.color.GRAY200};
  }
`,styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  padding: 0;

  border-radius: 50%;

  &:hover {
    background-color: ${({theme})=>theme.color.GRAY200};
  }
`),userInfoButton=styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;
  padding: 0;
`,teamColorButton=(modalOpenType,isModalOpen)=>styled_components_browser_esm.iv`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 0px;

  cursor: pointer;

  & svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    opacity: ${"teamColor"===modalOpenType&&isModalOpen?1:0};
  }

  &:hover {
    opacity: 0.8;
  }

  &:hover svg {
    opacity: 1;
  }
`;var TeamBadge=__webpack_require__("./src/components/team/TeamBadge/TeamBadge.tsx"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),TeamPlaceMenu=__webpack_require__("./src/components/team/TeamPlaceMenu/TeamPlaceMenu.tsx"),routes=__webpack_require__("./src/constants/routes.ts"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),constants_localStorage=__webpack_require__("./src/constants/localStorage.ts"),TeamPlaceInfoModal=__webpack_require__("./src/components/team/TeamPlaceInfoModal/TeamPlaceInfoModal.tsx"),useModal=__webpack_require__("./src/hooks/useModal.ts"),useFetchUserInfo=__webpack_require__("./src/hooks/queries/useFetchUserInfo.ts"),UserInfoModal=__webpack_require__("./src/components/user/UserInfoModal/UserInfoModal.tsx"),TeamColorEditModal=__webpack_require__("./src/components/team/TeamColorEditModal/TeamColorEditModal.tsx"),AccountDeleteModal=__webpack_require__("./src/components/user/AccountDeleteModal/AccountDeleteModal.tsx"),ServiceCenterModal=__webpack_require__("./src/components/user/ServiceCenterModal/ServiceCenterModal.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Header_stories={title:"common/Header",component:()=>{const{teamPlaces,teamPlaceId,changeTeamPlace,teamPlaceColor,displayName}=(0,useTeamPlace.l)(),navigate=(0,dist.s0)(),{openModal,isModalOpen}=(0,useModal.d)(),{userInfo}=(0,useFetchUserInfo.j)(),[teamName,setTeamName]=(0,react.useState)(displayName??""),[modalOpenType,setModalOpenType]=(0,react.useState)(),handleTeamNameChange=(0,react.useCallback)((value=>{if(""===value)return void setTeamName((()=>""));const newTeamPlace=teamPlaces.find((teamPlace=>teamPlace.displayName===value));void 0!==newTeamPlace&&(changeTeamPlace(newTeamPlace.id),setTeamName((()=>value)),location.pathname===routes.y.TEAM_SELECT&&navigate(routes.y.TEAM_OVERVIEW))}),[changeTeamPlace,teamPlaces]);return(0,react.useEffect)((()=>{const id=localStorage.getItem(constants_localStorage.J.TEAM_PLACE_ID);teamPlaceId===Number(id)&&handleTeamNameChange(displayName)}),[handleTeamNameChange,displayName,teamPlaceId]),(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)(Header,{tabIndex:0,children:[(0,jsx_runtime.jsxs)(InnerContainer,{children:[(0,jsx_runtime.jsx)(react_router_dom_dist.rU,{to:routes.y.TEAM_OVERVIEW,"aria-label":"모아보기 페이지로 가기",children:(0,jsx_runtime.jsx)(svg.K7,{})}),(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsxs)(Button.Z,{type:"button",variant:"plain",onClick:()=>{setModalOpenType((()=>"teamColor")),openModal()},css:teamColorButton(modalOpenType,isModalOpen),"aria-label":"팀 색상 변경하기",children:[(0,jsx_runtime.jsx)(TeamBadge.Z,{size:"lg",teamPlaceColor}),(0,jsx_runtime.jsx)(TeamBadgeEditIconWrapper,{children:(0,jsx_runtime.jsx)(svg.dY,{})})]}),(0,jsx_runtime.jsx)(TeamNameWrapper,{children:(0,jsx_runtime.jsx)(TeamPlaceMenu.Z,{displayValue:teamName,onSelect:handleTeamNameChange})})]})]}),(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",onClick:()=>{setModalOpenType((()=>"team")),openModal()},css:teamPlaceInfoButton,"aria-label":"팀 정보 보기",children:(0,jsx_runtime.jsx)(svg.Ww,{})}),(0,jsx_runtime.jsx)(Divider,{}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",css:userInfoButton,onClick:()=>{setModalOpenType((()=>"user")),openModal()},"aria-label":"프로필 보기",children:(0,jsx_runtime.jsx)(ProfileImage,{src:userInfo?.profileImageUrl,alt:"프로필 사진"})})]})]}),"team"===modalOpenType&&(0,jsx_runtime.jsx)(TeamPlaceInfoModal.Z,{}),"user"===modalOpenType&&(0,jsx_runtime.jsx)(UserInfoModal.Z,{onServiceCenterButtonClick:()=>{setModalOpenType((()=>"serviceCenter")),openModal()}}),"serviceCenter"===modalOpenType&&(0,jsx_runtime.jsx)(ServiceCenterModal.Z,{onAccountDeleteButtonClick:()=>{setModalOpenType((()=>"accountDelete")),openModal()}}),"teamColor"===modalOpenType&&(0,jsx_runtime.jsx)(TeamColorEditModal.Z,{}),"accountDelete"===modalOpenType&&(0,jsx_runtime.jsx)(AccountDeleteModal.Z,{})]})},tags:["autodocs"]},Default={args:{}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/apis/user.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{CS:()=>fetchUserInfo,NJ:()=>modifyUserInfo,xU:()=>deleteUserAccount});var _apis_http__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/http.ts");const fetchUserInfo=()=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.get("/api/me"),modifyUserInfo=body=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.patch("/api/me",body),deleteUserAccount=()=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.delete("/api/me/account")},"./src/components/common/Accordion/Accordion.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Accordion_Accordion});var react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const AccordionContext=(0,react.createContext)({}),AccordionProvider=props=>{const{children}=props,[openedAccordion,setOpenedAccordion]=(0,react.useState)(),value={openedAccordion,handleOpenedAccordionChange:id=>{setOpenedAccordion(openedAccordion===id?()=>{}:()=>id)}};return(0,jsx_runtime.jsx)(AccordionContext.Provider,{value,children})};AccordionProvider.displayName="AccordionProvider";try{AccordionProvider.displayName="AccordionProvider",AccordionProvider.__docgenInfo={description:"",displayName:"AccordionProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionContext.tsx#AccordionProvider"]={docgenInfo:AccordionProvider.__docgenInfo,name:"AccordionProvider",path:"src/components/common/Accordion/AccordionContext.tsx#AccordionProvider"})}catch(__react_docgen_typescript_loader_error){}var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.ZP.div`
  cursor: pointer;

  ${({$isOpen=!1})=>{if($isOpen)return styled_components_browser_esm.iv`
        outline: 3px ridge rgba(0, 46, 210, 0.381);
        border-radius: 2px;
      `}}
  svg {
    transition: transform 0.2s ease-in-out;
    ${({$isOpen=!1})=>$isOpen?styled_components_browser_esm.iv`
          transform: rotate(-180deg);
        `:styled_components_browser_esm.iv`
        transform: rotate(0);
      `}
  }
`,accordionButton=$padding=>styled_components_browser_esm.iv`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  overflow-anchor: none;

  width: 100%;
  padding: ${$padding};
  text-align: left;

  border: 0;
  border-radius: 0;
`,DisabledWrapper=styled_components_browser_esm.ZP.div`
  ${({$padding})=>accordionButton($padding)}
`;try{Container.displayName="Container",Container.__docgenInfo={description:"",displayName:"Container",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionHeader/AccordionHeader.styled.tsx#Container"]={docgenInfo:Container.__docgenInfo,name:"Container",path:"src/components/common/Accordion/AccordionHeader/AccordionHeader.styled.tsx#Container"})}catch(__react_docgen_typescript_loader_error){}try{accordionButton.displayName="accordionButton",accordionButton.__docgenInfo={description:"",displayName:"accordionButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionHeader/AccordionHeader.styled.tsx#accordionButton"]={docgenInfo:accordionButton.__docgenInfo,name:"accordionButton",path:"src/components/common/Accordion/AccordionHeader/AccordionHeader.styled.tsx#accordionButton"})}catch(__react_docgen_typescript_loader_error){}try{DisabledWrapper.displayName="DisabledWrapper",DisabledWrapper.__docgenInfo={description:"",displayName:"DisabledWrapper",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionHeader/AccordionHeader.styled.tsx#DisabledWrapper"]={docgenInfo:DisabledWrapper.__docgenInfo,name:"DisabledWrapper",path:"src/components/common/Accordion/AccordionHeader/AccordionHeader.styled.tsx#DisabledWrapper"})}catch(__react_docgen_typescript_loader_error){}var Button=__webpack_require__("./src/components/common/Button/Button.tsx");const useAccordion=()=>{const context=(0,react.useContext)(AccordionContext);if(void 0===context)throw new Error("useAccordion must be used within a AccordionProvider");return context};var svg=__webpack_require__("./src/assets/svg/index.ts");const AccordionHeader=props=>{const{id,padding="16px 18px 12px",disabled=!1,children}=props,{openedAccordion,handleOpenedAccordionChange}=useAccordion();return(0,jsx_runtime.jsx)(Container,{$isOpen:id===openedAccordion,children:disabled?(0,jsx_runtime.jsx)(DisabledWrapper,{$padding:padding,children}):(0,jsx_runtime.jsxs)(Button.Z,{type:"button",variant:"plain","aria-expanded":id===openedAccordion,css:accordionButton(padding),onClick:()=>handleOpenedAccordionChange(id),children:[children,(0,jsx_runtime.jsx)(svg.gV,{})]})})};AccordionHeader.displayName="AccordionHeader";const AccordionHeader_AccordionHeader=AccordionHeader;try{AccordionHeader.displayName="AccordionHeader",AccordionHeader.__docgenInfo={description:"",displayName:"AccordionHeader",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"number"}},padding:{defaultValue:null,description:"",name:"padding",required:!1,type:{name:"Padding<string | number>"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionHeader/AccordionHeader.tsx#AccordionHeader"]={docgenInfo:AccordionHeader.__docgenInfo,name:"AccordionHeader",path:"src/components/common/Accordion/AccordionHeader/AccordionHeader.tsx#AccordionHeader"})}catch(__react_docgen_typescript_loader_error){}const AccordionItem_styled_Container=styled_components_browser_esm.ZP.div`
  border-bottom: 1px solid ${({theme})=>theme.color.GRAY300};

  &:last-child {
    border-bottom: none;
  }
`;try{AccordionItem_styled_Container.displayName="Container",AccordionItem_styled_Container.__docgenInfo={description:"",displayName:"Container",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionItem/AccordionItem.styled.tsx#Container"]={docgenInfo:AccordionItem_styled_Container.__docgenInfo,name:"Container",path:"src/components/common/Accordion/AccordionItem/AccordionItem.styled.tsx#Container"})}catch(__react_docgen_typescript_loader_error){}const AccordionItem=props=>{const{children}=props;return(0,jsx_runtime.jsx)(AccordionItem_styled_Container,{children})};AccordionItem.displayName="AccordionItem";const AccordionItem_AccordionItem=AccordionItem;try{AccordionItem.displayName="AccordionItem",AccordionItem.__docgenInfo={description:"",displayName:"AccordionItem",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionItem/AccordionItem.tsx#AccordionItem"]={docgenInfo:AccordionItem.__docgenInfo,name:"AccordionItem",path:"src/components/common/Accordion/AccordionItem/AccordionItem.tsx#AccordionItem"})}catch(__react_docgen_typescript_loader_error){}const Accordion_styled_Container=styled_components_browser_esm.ZP.div`
  width: ${({$width="auto"})=>$width};

  border: 1px solid ${({theme})=>theme.color.GRAY300};
  border-radius: 4px;
`;try{Accordion_styled_Container.displayName="Container",Accordion_styled_Container.__docgenInfo={description:"",displayName:"Container",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/Accordion.styled.tsx#Container"]={docgenInfo:Accordion_styled_Container.__docgenInfo,name:"Container",path:"src/components/common/Accordion/Accordion.styled.tsx#Container"})}catch(__react_docgen_typescript_loader_error){}const AccordionBody_styled_Container=styled_components_browser_esm.ZP.div`
  overflow: hidden;
  height: ${({$isOpen,$height})=>$isOpen?$height+24:0}px;
  padding: ${({$isOpen})=>$isOpen?"10px 18px 12px":"0 18px"};
  border-top: 1px solid ${({theme})=>theme.color.GRAY300};

  transition: 0.35s ease;
`,AccordionBody=props=>{const{id,children}=props,{openedAccordion}=useAccordion(),[bodyHeight,setBodyHeight]=(0,react.useState)(0),ref=(0,react.useRef)(null);(0,react.useEffect)((()=>{if(!ref.current)return;const resizeObserver=new ResizeObserver((()=>{setBodyHeight((()=>ref.current?ref.current.clientHeight:0))}));return resizeObserver.observe(ref.current),()=>resizeObserver.disconnect()}));return(0,jsx_runtime.jsx)(AccordionBody_styled_Container,{$isOpen:id===openedAccordion,$height:id===openedAccordion?bodyHeight:0,children:(0,jsx_runtime.jsx)("div",{ref,children})})};AccordionBody.displayName="AccordionBody";const AccordionBody_AccordionBody=AccordionBody;try{AccordionBody.displayName="AccordionBody",AccordionBody.__docgenInfo={description:"",displayName:"AccordionBody",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionBody/AccordionBody.tsx#AccordionBody"]={docgenInfo:AccordionBody.__docgenInfo,name:"AccordionBody",path:"src/components/common/Accordion/AccordionBody/AccordionBody.tsx#AccordionBody"})}catch(__react_docgen_typescript_loader_error){}const Accordion=props=>{const{width,children}=props;return(0,jsx_runtime.jsx)(AccordionProvider,{children:(0,jsx_runtime.jsx)(Accordion_styled_Container,{$width:width,children})})};Accordion.displayName="Accordion",Accordion.Item=AccordionItem_AccordionItem,Accordion.Header=AccordionHeader_AccordionHeader,Accordion.Body=AccordionBody_AccordionBody;const Accordion_Accordion=Accordion;try{Accordion.displayName="Accordion",Accordion.__docgenInfo={description:"",displayName:"Accordion",props:{width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"Width<string | number>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/Accordion.tsx#Accordion"]={docgenInfo:Accordion.__docgenInfo,name:"Accordion",path:"src/components/common/Accordion/Accordion.tsx#Accordion"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Menu/Menu.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Menu_Menu});var react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const MenuContext=(0,react.createContext)({}),MenuProvider=props=>{const{children}=props,[isMenuOpen,setIsMenuOpen]=(0,react.useState)(!1),[selectedValue,setSelectedValue]=(0,react.useState)(""),value={isMenuOpen,selectedValue,handleMenuOpen:()=>{setIsMenuOpen((prev=>!prev))},handleSelectedValueChange:value=>{setSelectedValue((()=>value))}};return(0,jsx_runtime.jsx)(MenuContext.Provider,{value,children})};MenuProvider.displayName="MenuProvider";try{MenuProvider.displayName="MenuProvider",MenuProvider.__docgenInfo={description:"",displayName:"MenuProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Menu/MenuContext.tsx#MenuProvider"]={docgenInfo:MenuProvider.__docgenInfo,name:"MenuProvider",path:"src/components/common/Menu/MenuContext.tsx#MenuProvider"})}catch(__react_docgen_typescript_loader_error){}var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx");const useMenu=()=>{const context=(0,react.useContext)(MenuContext);if(void 0===context)throw new Error("useMenu must be used within a MenuProvider");return context},OPEN_TRIGGER_KEYS=["ArrowUp","ArrowDown"],MenuButton=props=>{const{children,value="",...rest}=props,{isMenuOpen,handleMenuOpen,handleSelectedValueChange}=useMenu();return(0,react.useEffect)((()=>{""!==value&&handleSelectedValueChange(value)}),[value,handleSelectedValueChange]),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain","aria-haspopup":"true","aria-expanded":isMenuOpen,onClick:handleMenuOpen,onKeyDown:e=>{OPEN_TRIGGER_KEYS.includes(e.key)&&(e.preventDefault(),isMenuOpen||handleMenuOpen())},...rest,children:children||(0,jsx_runtime.jsx)(Text.Z,{as:"span",children:value})})};MenuButton.displayName="MenuButton";const MenuButton_MenuButton=MenuButton;try{MenuButton.displayName="MenuButton",MenuButton.__docgenInfo={description:"",displayName:"MenuButton",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Menu/MenuButton/MenuButton.tsx#MenuButton"]={docgenInfo:MenuButton.__docgenInfo,name:"MenuButton",path:"src/components/common/Menu/MenuButton/MenuButton.tsx#MenuButton"})}catch(__react_docgen_typescript_loader_error){}var useClickOutside=__webpack_require__("./src/hooks/useClickOutside.ts");const TRIGGER_KEYS=["ArrowDown","ArrowUp","Enter","Escape"];var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.zo.ul.withConfig({shouldForwardProp:prop=>!["width"].includes(prop)})`
  position: absolute;
  z-index: ${({theme})=>theme.zIndex.MENU};

  max-height: 200px;
  width: ${({width})=>width};
  overflow-y: auto;

  background-color: ${({theme})=>theme.color.WHITE};

  border: 1px solid ${({theme})=>theme.color.GRAY200};
  border-radius: 6px;
`,MenuList=props=>{const{children,onSelect,width="100%"}=props,{isMenuOpen,selectedValue,handleMenuOpen,handleSelectedValueChange}=useMenu(),ref=(0,react.useRef)(null);(0,useClickOutside.Z)(ref,(e=>{const{target}=e;target instanceof HTMLButtonElement||target.closest("button")||handleMenuOpen()}));const selectItem=value=>{onSelect?.(value),handleSelectedValueChange(value),handleMenuOpen()},{handlers:{handleMouseEnter,handleMouseLeave,handleKeyDown}}=((ref,onClose,onSelect)=>{const isMouseOver=(0,react.useRef)(!1),getHoveredChildIndex=children=>{const hoveredChild=ref.current?.querySelector(":hover");return children.findIndex((child=>child===hoveredChild))},focusPrevChild=(children,selectedChildIndex)=>{if(0===selectedChildIndex)return;const currentChild=children[selectedChildIndex],prevChild=children[selectedChildIndex-1];currentChild.classList.remove("selected"),focusChild(prevChild)},focusNextChild=(children,selectedChildIndex)=>{if(selectedChildIndex===children.length-1)return;const currentChild=children[selectedChildIndex],nextChild=children[selectedChildIndex+1];currentChild.classList.remove("selected"),focusChild(nextChild)},focusChild=child=>{child.classList.add("selected"),scrollToChild(child)},scrollToChild=child=>{if(!(child instanceof HTMLLIElement))return;const{offsetTop}=child;ref.current?.scrollTo(0,offsetTop)};return{handlers:{handleMouseEnter:()=>{isMouseOver.current=!0;const children=Array.from(ref.current?.children??[]),selectedChildIndex=children.findIndex((child=>child.classList.contains("selected")));-1!==selectedChildIndex&&children[selectedChildIndex].classList.remove("selected")},handleMouseLeave:()=>{isMouseOver.current=!1},handleKeyDown:e=>{if(!TRIGGER_KEYS.includes(e.key))return;if(e.preventDefault(),"Escape"===e.key)return void onClose();const children=Array.from(ref.current?.children??[]),selectedChildIndex=children.findIndex((child=>child.classList.contains("selected")));if("ArrowUp"===e.key)return-1===selectedChildIndex?void(isMouseOver.current?focusPrevChild(children,getHoveredChildIndex(children)):focusChild(children[children.length-1])):void focusPrevChild(children,selectedChildIndex);if("ArrowDown"===e.key)return-1===selectedChildIndex?void(isMouseOver.current?focusNextChild(children,getHoveredChildIndex(children)):focusChild(children[0])):void focusNextChild(children,selectedChildIndex);if("Enter"===e.key){if(-1===selectedChildIndex)return;const selectedChild=children[selectedChildIndex],{textContent}=selectedChild;if(!textContent)return;onSelect(textContent)}}}}})(ref,handleMenuOpen,selectItem);return(0,react.useEffect)((()=>{isMenuOpen&&ref.current&&ref.current.focus()}),[isMenuOpen]),(0,react.useEffect)((()=>{if(""===selectedValue||!isMenuOpen)return;if(!ref.current)return;const target=Array.from(ref.current.children).find((child=>child.textContent?.replace("✓","")===selectedValue));if(!(target instanceof HTMLLIElement))return;const{offsetTop}=target;ref.current.scrollTo(0,offsetTop)}),[isMenuOpen,selectedValue]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:isMenuOpen&&(0,jsx_runtime.jsx)(Wrapper,{role:"menu",ref,width,onClick:e=>{const{target}=e;if(!(target instanceof HTMLLIElement))return;const{textContent}=target;textContent&&selectItem(textContent)},onMouseEnter:handleMouseEnter,onMouseLeave:handleMouseLeave,onKeyDown:handleKeyDown,tabIndex:0,children})})},MenuList_MenuList=MenuList;try{MenuList.displayName="MenuList",MenuList.__docgenInfo={description:"",displayName:"MenuList",props:{width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"string"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!1,type:{name:"((value: string) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Menu/MenuList/MenuList.tsx#MenuList"]={docgenInfo:MenuList.__docgenInfo,name:"MenuList",path:"src/components/common/Menu/MenuList/MenuList.tsx#MenuList"})}catch(__react_docgen_typescript_loader_error){}const MenuItem_styled_Wrapper=styled_components_browser_esm.zo.li`
  position: relative;

  padding: 8px 26px;

  cursor: pointer;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;

  &:hover {
    background-color: ${({theme})=>theme.color.GRAY100};
  }

  &.selected {
    background-color: ${({theme})=>theme.color.GRAY200};
  }

  ${({css})=>css}
`,checkMark=styled_components_browser_esm.iv`
  position: absolute;
  left: 10px;
`,MenuItem=props=>{const{children,value,css}=props,{selectedValue}=useMenu(),isSelected=selectedValue===value;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsxs)(MenuItem_styled_Wrapper,{role:"menuitem",css,className:isSelected?"selected":"",children:[isSelected&&(0,jsx_runtime.jsx)(Text.Z,{as:"span",css:checkMark,children:"✓"}),children]})})},MenuItem_MenuItem=MenuItem;try{MenuItem.displayName="MenuItem",MenuItem.__docgenInfo={description:"",displayName:"MenuItem",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Menu/MenuItem/MenuItem.tsx#MenuItem"]={docgenInfo:MenuItem.__docgenInfo,name:"MenuItem",path:"src/components/common/Menu/MenuItem/MenuItem.tsx#MenuItem"})}catch(__react_docgen_typescript_loader_error){}const Menu_styled_Wrapper=styled_components_browser_esm.zo.div`
  position: relative;
`,Menu=props=>{const{children}=props;return(0,jsx_runtime.jsx)(MenuProvider,{children:(0,jsx_runtime.jsx)(Menu_styled_Wrapper,{children})})};Menu.displayName="Menu",Menu.Button=MenuButton_MenuButton,Menu.List=MenuList_MenuList,Menu.Item=MenuItem_MenuItem;const Menu_Menu=Menu;try{Menu.displayName="Menu",Menu.__docgenInfo={description:"",displayName:"Menu",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Menu/Menu.tsx#Menu"]={docgenInfo:Menu.__docgenInfo,name:"Menu",path:"src/components/common/Menu/Menu.tsx#Menu"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team/TeamColorEditModal/TeamColorEditModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TeamColorEditModal_TeamColorEditModal});var useModal=__webpack_require__("./src/hooks/useModal.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`,BubbleContainer=styled_components_browser_esm.zo.div`
  position: fixed;
  z-index: ${({theme})=>theme.zIndex.MODAL};

  width: 200px;
  padding: 18px 22px 12px;

  background-color: ${({theme})=>theme.color.WHITE};
  border-radius: 10px;

  transform: translate(36px, 64px);

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
`,Triangle=styled_components_browser_esm.zo.div`
  position: absolute;
  z-index: ${({theme})=>theme.zIndex.MODAL} + 1;
  top: -12px;
  left: 20%;

  width: 28px;
  height: 28px;

  border-radius: 4px;
  background-color: ${({theme})=>theme.color.WHITE};

  box-shadow: -1px 1px rgb(178 178 178 / 0.6);

  transform: rotate(135deg);
`,InnerContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;

  gap: 6px;
`,BadgeContainer=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  position: relative;
  justify-items: center;
  row-gap: 14px;
`,BadgeWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;

  border-radius: 50%;
  ${({$isClicked})=>{if($isClicked)return styled_components_browser_esm.iv`
        border: 2px solid ${({theme})=>theme.color.GRAY350};
      `}}

  cursor: pointer;
`,colorEditButton=styled_components_browser_esm.iv`
  padding: 4px;

  font-size: 12px;
`;var TeamBadge=__webpack_require__("./src/components/team/TeamBadge/TeamBadge.tsx"),arrayOf=__webpack_require__("./src/utils/arrayOf.ts"),Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),react=__webpack_require__("./node_modules/react/index.js"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),team=__webpack_require__("./src/apis/team.ts");var useToast=__webpack_require__("./src/hooks/useToast.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TeamColorEditModal=()=>{const{closeModal}=(0,useModal.d)(),{teamPlaceId,teamPlaceColor,displayName}=(0,useTeamPlace.l)(),{showToast}=(0,useToast.p)(),{mutateModifyTeamPlaceColor}=(teamPlaceId=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate}=(0,useMutation.D)((body=>(0,team.oT)(teamPlaceId,body)),{onSuccess:()=>{queryClient.invalidateQueries(["teamPlaces"])}});return{mutateModifyTeamPlaceColor:mutate}})(teamPlaceId),[teamColor,setTeamColor]=(0,react.useState)(teamPlaceColor);(0,react.useEffect)((()=>{setTeamColor((()=>teamPlaceColor))}),[teamPlaceColor]);return(0,jsx_runtime.jsxs)(Modal.Z,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:()=>{closeModal(),setTeamColor((()=>teamPlaceColor))}}),(0,jsx_runtime.jsxs)(BubbleContainer,{children:[(0,jsx_runtime.jsx)(Triangle,{}),(0,jsx_runtime.jsxs)(InnerContainer,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"sm",weight:"semiBold",children:"팀 색상 변경"}),(0,jsx_runtime.jsx)(BadgeContainer,{children:(0,arrayOf.C)(10).map((color=>(0,jsx_runtime.jsx)(BadgeWrapper,{$isClicked:teamColor===color,onClick:e=>{e.stopPropagation(),(teamColor=>{setTeamColor((()=>teamColor))})(color)},children:(0,jsx_runtime.jsx)(TeamBadge.Z,{size:"lg",teamPlaceColor:color})},color)))}),(0,jsx_runtime.jsx)(Button.Z,{variant:"normal",onClick:e=>{e.preventDefault(),teamColor!==teamPlaceColor?(mutateModifyTeamPlaceColor({teamPlaceColor:teamColor},{onSuccess:()=>{showToast("success",`'${displayName}' 팀 색상이 변경되었습니다.`)},onError:()=>{showToast("error","팀 색상 변경이 실패했습니다.")}}),closeModal()):closeModal()},css:colorEditButton,children:"변경하기"})]})]})]})};TeamColorEditModal.displayName="TeamColorEditModal";const TeamColorEditModal_TeamColorEditModal=TeamColorEditModal},"./src/components/team/TeamPlaceMenu/TeamPlaceMenu.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TeamPlaceMenu_TeamPlaceMenu});var Menu=__webpack_require__("./src/components/common/Menu/Menu.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),TeamBadge=__webpack_require__("./src/components/team/TeamBadge/TeamBadge.tsx"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const teamInfo=styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  gap: 10px;
`,teamPlaceButton=styled_components_browser_esm.iv`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 40px;
  padding: 0;

  border-bottom: 1px solid ${({theme})=>theme.color.GRAY200};
  border-radius: 4px;

  & svg {
    width: 24px;
    height: 24px;
    padding: 0;
  }
`,teamPlaceName=styled_components_browser_esm.iv`
  overflow: hidden;
  text-overflow: ellipsis;

  width: 260px;

  font-size: 22px;
  line-height: 22px;
  white-space: nowrap;
`;styled_components_browser_esm.iv`
  font-size: 24px;
  font-weight: bold;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TeamPlaceMenu=props=>{const{displayValue,onSelect}=props,{teamPlaces}=(0,useTeamPlace.l)();return(0,jsx_runtime.jsxs)(Menu.Z,{children:[(0,jsx_runtime.jsxs)(Menu.Z.Button,{type:"button",css:teamPlaceButton,"aria-label":"목록에서 팀 선택하기",title:displayValue,value:displayValue,children:[(0,jsx_runtime.jsx)(Text.Z,{as:"span",weight:"bold",css:teamPlaceName,children:displayValue}),(0,jsx_runtime.jsx)(svg.gV,{})]}),(0,jsx_runtime.jsx)(Menu.Z.List,{onSelect:value=>{onSelect(value)},children:teamPlaces.map((teamPlace=>(0,jsx_runtime.jsxs)(Menu.Z.Item,{value:teamPlace.displayName,css:teamInfo,children:[(0,jsx_runtime.jsx)(TeamBadge.Z,{size:"sm",teamPlaceColor:teamPlace.teamPlaceColor}),teamPlace.displayName]},teamPlace.id)))})]})};TeamPlaceMenu.displayName="TeamPlaceMenu";const TeamPlaceMenu_TeamPlaceMenu=TeamPlaceMenu;try{TeamPlaceMenu.displayName="TeamPlaceMenu",TeamPlaceMenu.__docgenInfo={description:"",displayName:"TeamPlaceMenu",props:{displayValue:{defaultValue:null,description:"",name:"displayValue",required:!0,type:{name:"string"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!0,type:{name:"(value: string) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team/TeamPlaceMenu/TeamPlaceMenu.tsx#TeamPlaceMenu"]={docgenInfo:TeamPlaceMenu.__docgenInfo,name:"TeamPlaceMenu",path:"src/components/team/TeamPlaceMenu/TeamPlaceMenu.tsx#TeamPlaceMenu"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/user/AccountDeleteModal/AccountDeleteModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>AccountDeleteModal_AccountDeleteModal});var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Input=__webpack_require__("./src/components/common/Input/Input.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);
`,Container=styled_components_browser_esm.zo.div`
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
`,ModalHeader=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 38px;

  border-bottom: ${({theme})=>`1px solid ${theme.color.GRAY300}`};
`,ModalBody=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`,WarningBox=styled_components_browser_esm.zo.div`
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
`,Username=styled_components_browser_esm.zo.span`
  color: ${({theme})=>theme.color.PRIMARY};
`,AccountDeleteForm=styled_components_browser_esm.zo.form`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`,closeButton=styled_components_browser_esm.iv`
  width: 32px;
  height: 38px;
  padding: 0;
`,deleteConfirmInput=styled_components_browser_esm.iv`
  padding: 0 10px;

  font-size: 16px;

  border-radius: 4px;
  border: 1px solid ${({theme})=>theme.color.GRAY400};
`,accountDeleteButton=styled_components_browser_esm.iv`
  width: 100%;

  background-color: ${({theme})=>theme.color.RED};
`;var user=__webpack_require__("./src/constants/user.ts"),useModal=__webpack_require__("./src/hooks/useModal.ts"),react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),constants_localStorage=__webpack_require__("./src/constants/localStorage.ts"),routes=__webpack_require__("./src/constants/routes.ts"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),apis_user=__webpack_require__("./src/apis/user.ts");var useFetchUserInfo=__webpack_require__("./src/hooks/queries/useFetchUserInfo.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),useToken=__webpack_require__("./src/hooks/useToken.ts");const useAccountDeleteModal=()=>{const{userInfo}=(0,useFetchUserInfo.j)(),{mutateDeleteUserAccount}=(()=>{const{mutate}=(0,useMutation.D)((()=>(0,apis_user.xU)()));return{mutateDeleteUserAccount:mutate}})(),[inputValue,setInputValue]=(0,react.useState)(""),navigate=(0,dist.s0)(),{showToast}=(0,useToast.p)(),{resetToken}=(0,useToken.d)();return{username:userInfo?.name,inputValue,isDeleteButtonDisabled:inputValue!==user.M,handlers:{handleInputValueChange:e=>{setInputValue((()=>e.target.value))},handleDeleteAccountSubmit:e=>{e.preventDefault(),inputValue!==user.M&&(alert("탈퇴를 위해 정확한 문구를 입력하세요"),setInputValue((()=>""))),mutateDeleteUserAccount(void 0,{onSuccess:()=>{alert("정상적으로 회원탈퇴 되었습니다."),resetToken(),localStorage.removeItem(constants_localStorage.J.TEAM_PLACE_ID),navigate(routes.y.LANDING)},onError:()=>{showToast("error","탈퇴가 실패했습니다. 다시 시도해주세요")}})}}}};var svg=__webpack_require__("./src/assets/svg/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const AccountDeleteModal=()=>{const{closeModal}=(0,useModal.d)(),{username,inputValue,isDeleteButtonDisabled,handlers:{handleInputValueChange,handleDeleteAccountSubmit}}=useAccountDeleteModal();return(0,jsx_runtime.jsxs)(Modal.Z,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(ModalHeader,{children:(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:closeButton,onClick:closeModal,"aria-label":"회원 탈퇴 모달 닫기",children:(0,jsx_runtime.jsx)(svg.Tw,{})})}),(0,jsx_runtime.jsxs)(ModalBody,{children:[(0,jsx_runtime.jsxs)(Text.Z,{size:"xxl",weight:"bold",children:[(0,jsx_runtime.jsx)(Username,{children:username}),"님을 떠나보내야 한다니 아쉬워요."]}),(0,jsx_runtime.jsx)(Text.Z,{size:"lg",children:"회원 탈퇴 전, 아래의 유의사항을 읽어 주세요."}),(0,jsx_runtime.jsx)(WarningBox,{children:(0,jsx_runtime.jsxs)("ul",{children:[(0,jsx_runtime.jsx)("li",{children:"소속된 모든 팀에서 자동으로 나가집니다."}),(0,jsx_runtime.jsx)("li",{children:"회원 정보는 영구적으로 삭제되며, 복구할 수 없게 됩니다."})]})}),(0,jsx_runtime.jsxs)(Text.Z,{size:"lg",children:["유의사항을 모두 확인하셨고, 회원 탈퇴를 원하신다면 하단의 입력창에"," ",(0,jsx_runtime.jsx)("b",{children:user.M}),"를 입력해 주세요."]})]}),(0,jsx_runtime.jsxs)(AccountDeleteForm,{onSubmit:handleDeleteAccountSubmit,children:[(0,jsx_runtime.jsx)(Input.Z,{width:"100%",height:"40px",placeholder:`'${user.M}' 를 입력해 주세요.`,css:deleteConfirmInput,value:inputValue,onChange:handleInputValueChange,autoFocus:!0,required:!0}),(0,jsx_runtime.jsx)(Button.Z,{disabled:isDeleteButtonDisabled,css:accountDeleteButton,children:"회원 탈퇴하기"})]})]})]})};AccountDeleteModal.displayName="AccountDeleteModal";const AccountDeleteModal_AccountDeleteModal=AccountDeleteModal},"./src/components/user/ServiceCenterModal/ServiceCenterModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ServiceCenterModal_ServiceCenterModal});var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({theme})=>theme.zIndex.MODAL-1};

  width: 100%;
  height: 100%;
`,Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: ${({theme})=>theme.zIndex.MODAL};

  width: 490px;
  max-width: 100%;
  padding: 18px 20px 20px 20px;
  row-gap: 10px;

  border-radius: 12px;
  background-color: ${({theme})=>theme.color.WHITE};

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;

  transform: translate(-50%, -50%);
`,ModalHeader=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 36px;

  border-bottom: ${({theme})=>`1px solid ${theme.color.GRAY300}`};
`,ModalBody=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`,ExplainBox=styled_components_browser_esm.zo.div`
  padding: 10px;

  border-radius: 4px;
  background-color: ${({theme})=>theme.color.GRAY100};
`,AccountBodyContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`,ContentContainer=styled_components_browser_esm.zo.div`
  display: flex;
  column-gap: 10px;
`,UrlWrapper=styled_components_browser_esm.zo.a`
  width: 100%;
`,closeButton=styled_components_browser_esm.iv`
  width: 32px;
  height: 38px;
  padding: 0;
`,dangerousButton=styled_components_browser_esm.iv`
  display: flex;
  position: relative;
  align-self: flex-end;
  align-items: center;
  padding: 0px;

  cursor: pointer;
`,dangerousText=styled_components_browser_esm.iv`
  color: ${({theme})=>theme.color.RED};
`,mailText=(styled_components_browser_esm.iv`
  white-space: pre;
`,styled_components_browser_esm.iv`
  text-decoration-line: underline;
`);var useModal=__webpack_require__("./src/hooks/useModal.ts"),svg=__webpack_require__("./src/assets/svg/index.ts"),Accordion=__webpack_require__("./src/components/common/Accordion/Accordion.tsx"),url=__webpack_require__("./src/constants/url.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ServiceCenterModal=props=>{const{closeModal}=(0,useModal.d)(),{onAccountDeleteButtonClick}=props;return(0,jsx_runtime.jsxs)(Modal.Z,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(ModalHeader,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"xl",weight:"bold",children:"고객문의"}),(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:closeButton,onClick:closeModal,"aria-label":"고객문의 닫기",children:(0,jsx_runtime.jsx)(svg.Tw,{})})]}),(0,jsx_runtime.jsxs)(ModalBody,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"lg",weight:"semiBold",children:"무엇을 도와드릴까요?"}),(0,jsx_runtime.jsxs)(ExplainBox,{children:["원하시는 내용이 없다면 아래 메일로 문의해 주세요.",(0,jsx_runtime.jsx)("a",{href:"mailto:teambyteam.official@gmail.com?subject=팀바팀 문의합니다.&body=이메일(팀바팀 계정):%0D%0A문의분류(계정, 서비스, 버그, 기능추가, 기타):%0D%0A문의내용:%0D%0A",children:(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",size:"sm",css:mailText,children:"teambyteam.official@gmail.com"})})]}),(0,jsx_runtime.jsxs)(Accordion.Z,{children:[(0,jsx_runtime.jsx)(Accordion.Z.Item,{children:(0,jsx_runtime.jsx)(Accordion.Z.Header,{id:0,padding:"20px 18px",disabled:!0,children:(0,jsx_runtime.jsx)(UrlWrapper,{href:url.O8,target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",children:"피드백 남기기"})})})}),(0,jsx_runtime.jsxs)(Accordion.Z.Item,{children:[(0,jsx_runtime.jsx)(Accordion.Z.Item,{children:(0,jsx_runtime.jsx)(Accordion.Z.Header,{id:1,padding:"20px 18px",disabled:!0,children:(0,jsx_runtime.jsx)(UrlWrapper,{href:url.Mx,target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",children:"팀바팀 사용방법"})})})}),(0,jsx_runtime.jsx)(Accordion.Z.Header,{id:2,padding:"10px 18px",children:(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",children:"팀바팀 소개"})}),(0,jsx_runtime.jsx)(Accordion.Z.Body,{id:2,children:(0,jsx_runtime.jsxs)(AccountBodyContainer,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"sm",children:"'팀바팀'은 ✨쉽고 간단한 협업을 위한 서비스✨로 여러 협업을 진행할 때 복잡한 도구를 사용할 필요없이 여러가지 기능을 사용할 수 있습니다."}),(0,jsx_runtime.jsx)("a",{href:url.D_,target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(Text.Z,{size:"sm",weight:"semiBold",children:"팀바팀 Repository 이동하기"})})]})})]}),(0,jsx_runtime.jsxs)(Accordion.Z.Item,{children:[(0,jsx_runtime.jsx)(Accordion.Z.Header,{id:3,padding:"10px 18px",children:(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",children:"Q&A"})}),(0,jsx_runtime.jsx)(Accordion.Z.Body,{id:3,children:(0,jsx_runtime.jsxs)(AccountBodyContainer,{children:[(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"sm",weight:"semiBold",children:"Q. 외부 캘린더(구글 캘린더, iOS 캘린더 앱)에서도 팀 일정을 보고 싶어요."}),(0,jsx_runtime.jsx)(Text.Z,{size:"sm",children:"아래 설명서를 참고해 주세요."}),(0,jsx_runtime.jsx)("a",{href:url.sE,target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(Text.Z,{as:"span",size:"sm",children:"📘 일정 파일(.ics) 사용법"})})]}),(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"sm",weight:"semiBold",children:"Q. 탈퇴는 어떻게 하나요?"}),(0,jsx_runtime.jsxs)(ContentContainer,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"sm",as:"span",children:"회원 탈퇴를 진행하시려면 옆 버튼을 눌러주세요."}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",css:dangerousButton,onClick:onAccountDeleteButtonClick,"aria-label":"회원탈퇴하기",children:(0,jsx_runtime.jsx)(Text.Z,{size:"sm",css:dangerousText,children:"회원 탈퇴"})})]})]})]})})]})]})]})]})]})};ServiceCenterModal.displayName="ServiceCenterModal";const ServiceCenterModal_ServiceCenterModal=ServiceCenterModal;try{ServiceCenterModal.displayName="ServiceCenterModal",ServiceCenterModal.__docgenInfo={description:"",displayName:"ServiceCenterModal",props:{onAccountDeleteButtonClick:{defaultValue:null,description:"",name:"onAccountDeleteButtonClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/user/ServiceCenterModal/ServiceCenterModal.tsx#ServiceCenterModal"]={docgenInfo:ServiceCenterModal.__docgenInfo,name:"ServiceCenterModal",path:"src/components/user/ServiceCenterModal/ServiceCenterModal.tsx#ServiceCenterModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/user/UserInfoModal/UserInfoModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>UserInfoModal_UserInfoModal});var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Input=__webpack_require__("./src/components/common/Input/Input.tsx"),react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),useFetchUserInfo=__webpack_require__("./src/hooks/queries/useFetchUserInfo.ts"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),user=__webpack_require__("./src/apis/user.ts");var useClickOutside=__webpack_require__("./src/hooks/useClickOutside.ts"),useModal=__webpack_require__("./src/hooks/useModal.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),constants_localStorage=__webpack_require__("./src/constants/localStorage.ts"),routes=__webpack_require__("./src/constants/routes.ts"),constants_user=__webpack_require__("./src/constants/user.ts"),useToken=__webpack_require__("./src/hooks/useToken.ts");const useUserInfoModal=()=>{const navigate=(0,dist.s0)(),{showToast}=(0,useToast.p)(),{closeModal}=(0,useModal.d)(),{resetToken}=(0,useToken.d)(),{mutateModifyUserInfo}=(()=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate}=(0,useMutation.D)((body=>(0,user.NJ)(body)),{onSuccess:()=>{queryClient.invalidateQueries(["userInfo"])}});return{mutateModifyUserInfo:mutate}})(),{userInfo}=(0,useFetchUserInfo.j)(),[isUserInfoEditing,setIsUserInfoEditing]=(0,react.useState)(!1),[userName,setUserName]=(0,react.useState)(""),userNameRef=(0,react.useRef)(null);(0,useClickOutside.Z)(userNameRef,(()=>{isUserInfoEditing&&setIsUserInfoEditing((()=>!1))}));return(0,react.useEffect)((()=>{userInfo&&setUserName((()=>userInfo.name))}),[userInfo,isUserInfoEditing]),{userInfo,userName,userNameRef,isUserInfoEditing,handlers:{handleClose:()=>{setIsUserInfoEditing((()=>!1)),closeModal()},handleLogoutClick:()=>{confirm("로그아웃 하시겠습니까?")&&(alert("로그아웃 되었습니다."),resetToken(),localStorage.removeItem(constants_localStorage.J.TEAM_PLACE_ID),navigate(routes.y.LANDING))},handleUserNameChange:e=>{setUserName((()=>e.target.value))},handleUserInfoEditButtonClick:()=>{setIsUserInfoEditing((()=>!0))},handleUserInfoSubmit:e=>{e.preventDefault();const name=userName.trim();""!==name&&name!==userInfo?.name?name.length>constants_user.O?showToast("error",`닉네임은 최대 ${constants_user.O}자까지 입력할 수 있습니다.`):mutateModifyUserInfo({name},{onSuccess:()=>{setIsUserInfoEditing((()=>!1)),showToast("success","닉네임이 변경되었습니다.")},onError:()=>{showToast("error","닉네임 변경에 실패했습니다.")}}):setIsUserInfoEditing((()=>!1))}}}};var svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`,Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  overflow: hidden;
  top: 50px;
  right: 20px;
  z-index: ${({theme})=>theme.zIndex.MODAL};

  width: 270px;
  height: 420px;
  padding: 20px 30px;
  gap: 10px;

  border-radius: 8px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({theme})=>theme.color.WHITE};
`,UserInfoForm=styled_components_browser_esm.zo.form`
  display: flex;
  align-items: center;

  column-gap: 6px;

  &:focus {
    outline: ${({theme})=>theme.color.PRIMARY};
  }
`,UserNameInputContainer=styled_components_browser_esm.zo.div`
  width: 200px;

  border: 1px solid ${({theme})=>theme.color.GRAY200};
  border-radius: 4px;
`,UserNameContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 20px;
  column-gap: 5px;
`,ProfileImage=styled_components_browser_esm.zo.img`
  width: 200px;
  height: 200px;
  margin: 10px auto;

  border-radius: 50%;
  object-fit: cover;
`,serviceCenterButton=styled_components_browser_esm.iv`
  display: flex;
  position: relative;
  align-self: flex-end;
  align-items: center;
  padding: 0px;

  cursor: pointer;
`,logoutButton=(styled_components_browser_esm.iv`
  opacity: 0;
  color: ${({theme})=>theme.color.RED};
`,styled_components_browser_esm.iv`
  display: flex;
  align-items: center;

  margin: 0 auto;
  padding: 8px;
  gap: 2px;
`),UserInfoModal_styled_userName=styled_components_browser_esm.iv`
  overflow: hidden;

  max-width: 140px;

  font-weight: 500;
  white-space: pre;
  text-overflow: ellipsis;
  text-align: center;
`,UserInfoModal_styled_email=styled_components_browser_esm.iv`
  margin: 0 auto;

  font-size: 14px;
  color: ${({theme})=>theme.color.GRAY600};
`,userInfoEditButton=styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;
  padding: 2px;

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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const UserInfoModal=props=>{const{userInfo,userName,userNameRef,isUserInfoEditing,handlers:{handleClose,handleLogoutClick,handleUserNameChange,handleUserInfoEditButtonClick,handleUserInfoSubmit}}=useUserInfoModal(),{onServiceCenterButtonClick}=props;if(!userInfo)return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{});const{name,profileImageUrl,email}=userInfo;return(0,jsx_runtime.jsxs)(Modal.Z,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:handleClose}),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Text.Z,{as:"span",size:"lg",weight:"semiBold",children:"프로필"}),(0,jsx_runtime.jsx)(ProfileImage,{src:profileImageUrl,alt:"프로필 이미지"}),(0,jsx_runtime.jsx)(UserNameContainer,{ref:userNameRef,children:isUserInfoEditing?(0,jsx_runtime.jsxs)(UserInfoForm,{onSubmit:handleUserInfoSubmit,children:[(0,jsx_runtime.jsxs)(UserNameInputContainer,{children:[(0,jsx_runtime.jsx)(Input.Z,{width:"160px",height:"32px",placeholder:name,value:userName,onChange:handleUserNameChange,minLength:1,maxLength:constants_user.O,css:userNameInput,autoFocus:!0}),(0,jsx_runtime.jsx)(Text.Z,{as:"span",css:userNameLength,children:`${userName.length}/${constants_user.O}`})]}),(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",css:userInfoSubmitButton,children:(0,jsx_runtime.jsx)(svg.yZ,{})})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Text.Z,{as:"span",size:"xl",css:UserInfoModal_styled_userName,children:name}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain","aria-label":"닉네임 수정하기",css:userInfoEditButton,onClick:handleUserInfoEditButtonClick,children:(0,jsx_runtime.jsx)(svg.dY,{})})]})}),(0,jsx_runtime.jsx)(Text.Z,{as:"span",css:UserInfoModal_styled_email,children:email}),(0,jsx_runtime.jsxs)(Button.Z,{type:"button",variant:"normal",css:logoutButton,onClick:handleLogoutClick,children:["로그아웃",(0,jsx_runtime.jsx)(svg.R0,{})]}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",css:serviceCenterButton,onClick:onServiceCenterButtonClick,"aria-label":"고객문의",children:(0,jsx_runtime.jsx)(Text.Z,{size:"sm",children:"고객문의"})})]})]})};UserInfoModal.displayName="UserInfoModal";const UserInfoModal_UserInfoModal=UserInfoModal;try{UserInfoModal.displayName="UserInfoModal",UserInfoModal.__docgenInfo={description:"",displayName:"UserInfoModal",props:{onServiceCenterButtonClick:{defaultValue:null,description:"",name:"onServiceCenterButtonClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/user/UserInfoModal/UserInfoModal.tsx#UserInfoModal"]={docgenInfo:UserInfoModal.__docgenInfo,name:"UserInfoModal",path:"src/components/user/UserInfoModal/UserInfoModal.tsx#UserInfoModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/url.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D_:()=>TEAM_BY_TEAM_REPOSITORY,Mx:()=>TEAM_BY_TEAM_HOW_TO_USE_URL,O8:()=>USER_FEEDBACK_URL,sE:()=>ICALENDAR_USER_GUIDE_URL});const ICALENDAR_USER_GUIDE_URL="https://teambyteam.notion.site/a99a38a030d74be88e761a1dcb1559a1",USER_FEEDBACK_URL="https://forms.gle/Tk8DZ5Xzsc5615Ar7",TEAM_BY_TEAM_HOW_TO_USE_URL="https://teambyteam.notion.site/f84827ca26334913a1c724dfb9436887",TEAM_BY_TEAM_REPOSITORY="https://github.com/woowacourse-teams/2023-team-by-team"},"./src/hooks/queries/useFetchUserInfo.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{j:()=>useFetchUserInfo});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),_apis_user__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/user.ts"),_constants_query__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/query.ts");const useFetchUserInfo=()=>{const{data}=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.a)(["userInfo"],_apis_user__WEBPACK_IMPORTED_MODULE_0__.CS,{staleTime:_constants_query__WEBPACK_IMPORTED_MODULE_1__.i.USER_INFO});return{userInfo:data}}},"./src/hooks/useToken.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useToken});var react=__webpack_require__("./node_modules/react/index.js"),constants_localStorage=__webpack_require__("./src/constants/localStorage.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TokenContext=(0,react.createContext)({}),TokenProvider=({children})=>{const[accessToken,setAccessToken]=(0,react.useState)((()=>localStorage.getItem(constants_localStorage.J.ACCESS_TOKEN)??"")),[refreshToken,setRefreshToken]=(0,react.useState)((()=>localStorage.getItem(constants_localStorage.J.REFRESH_TOKEN)??"")),value={accessToken,refreshToken,updateToken:(accessToken,refreshToken)=>{setAccessToken((()=>accessToken??"")),setRefreshToken((()=>refreshToken??"")),localStorage.setItem(constants_localStorage.J.ACCESS_TOKEN,accessToken),localStorage.setItem(constants_localStorage.J.REFRESH_TOKEN,refreshToken)},resetToken:()=>{setAccessToken((()=>"")),setRefreshToken((()=>"")),localStorage.removeItem(constants_localStorage.J.ACCESS_TOKEN),localStorage.removeItem(constants_localStorage.J.REFRESH_TOKEN)}};return(0,jsx_runtime.jsx)(TokenContext.Provider,{value,children})};TokenProvider.displayName="TokenProvider";try{TokenProvider.displayName="TokenProvider",TokenProvider.__docgenInfo={description:"",displayName:"TokenProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/contexts/TokenContext.tsx#TokenProvider"]={docgenInfo:TokenProvider.__docgenInfo,name:"TokenProvider",path:"src/contexts/TokenContext.tsx#TokenProvider"})}catch(__react_docgen_typescript_loader_error){}const useToken=()=>{const context=(0,react.useContext)(TokenContext);if(void 0===context)throw new Error("useToken must be used within a TokenContext");return context}},"./src/utils/arrayOf.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>arrayOf});const arrayOf=count=>[...new Array(count).keys()]}}]);
//# sourceMappingURL=components-common-Header-Header-stories.bd65e0b8.iframe.bundle.js.map