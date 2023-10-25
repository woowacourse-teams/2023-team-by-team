"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9776],{"./src/components/team/TeamPlaceMenu/TeamPlaceMenu.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Common/TeamPlaceMenu",component:__webpack_require__("./src/components/team/TeamPlaceMenu/TeamPlaceMenu.tsx").Z,tags:["autodocs"]},Default={args:{displayValue:"팀 선택하기",onSelect:value=>{alert(value)}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    displayValue: '팀 선택하기',\n    onSelect: (value: string) => {\n      alert(value);\n    }\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Menu/Menu.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Menu_Menu});var react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const MenuContext=(0,react.createContext)({}),MenuProvider=props=>{const{children}=props,[isMenuOpen,setIsMenuOpen]=(0,react.useState)(!1),[selectedValue,setSelectedValue]=(0,react.useState)(""),value={isMenuOpen,selectedValue,handleMenuOpen:()=>{setIsMenuOpen((prev=>!prev))},handleSelectedValueChange:value=>{setSelectedValue((()=>value))}};return(0,jsx_runtime.jsx)(MenuContext.Provider,{value,children})};MenuProvider.displayName="MenuProvider";try{MenuProvider.displayName="MenuProvider",MenuProvider.__docgenInfo={description:"",displayName:"MenuProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Menu/MenuContext.tsx#MenuProvider"]={docgenInfo:MenuProvider.__docgenInfo,name:"MenuProvider",path:"src/components/common/Menu/MenuContext.tsx#MenuProvider"})}catch(__react_docgen_typescript_loader_error){}var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx");const useMenu=()=>{const context=(0,react.useContext)(MenuContext);if(void 0===context)throw new Error("useMenu must be used within a MenuProvider");return context},OPEN_TRIGGER_KEYS=["ArrowUp","ArrowDown"],MenuButton=props=>{const{children,value="",...rest}=props,{isMenuOpen,handleMenuOpen,handleSelectedValueChange}=useMenu();return(0,react.useEffect)((()=>{""!==value&&handleSelectedValueChange(value)}),[value,handleSelectedValueChange]),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain","aria-haspopup":"true","aria-expanded":isMenuOpen,onClick:handleMenuOpen,onKeyDown:e=>{OPEN_TRIGGER_KEYS.includes(e.key)&&(e.preventDefault(),isMenuOpen||handleMenuOpen())},...rest,children:children||(0,jsx_runtime.jsx)(Text.Z,{as:"span",children:value})})};MenuButton.displayName="MenuButton";const MenuButton_MenuButton=MenuButton;try{MenuButton.displayName="MenuButton",MenuButton.__docgenInfo={description:"",displayName:"MenuButton",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Menu/MenuButton/MenuButton.tsx#MenuButton"]={docgenInfo:MenuButton.__docgenInfo,name:"MenuButton",path:"src/components/common/Menu/MenuButton/MenuButton.tsx#MenuButton"})}catch(__react_docgen_typescript_loader_error){}var useClickOutside=__webpack_require__("./src/hooks/useClickOutside.ts");const TRIGGER_KEYS=["ArrowDown","ArrowUp","Enter","Escape"];var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.zo.ul`
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
`,Menu=props=>{const{children}=props;return(0,jsx_runtime.jsx)(MenuProvider,{children:(0,jsx_runtime.jsx)(Menu_styled_Wrapper,{children})})};Menu.displayName="Menu",Menu.Button=MenuButton_MenuButton,Menu.List=MenuList_MenuList,Menu.Item=MenuItem_MenuItem;const Menu_Menu=Menu;try{Menu.displayName="Menu",Menu.__docgenInfo={description:"",displayName:"Menu",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Menu/Menu.tsx#Menu"]={docgenInfo:Menu.__docgenInfo,name:"Menu",path:"src/components/common/Menu/Menu.tsx#Menu"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TeamBadge=props=>{const{teamPlaceColor,size="md"}=props;return(0,jsx_runtime.jsx)(Wrapper,{teamPlaceColor,size})};TeamBadge.displayName="TeamBadge";const TeamBadge_TeamBadge=TeamBadge;try{TeamBadge.displayName="TeamBadge",TeamBadge.__docgenInfo={description:"",displayName:"TeamBadge",props:{teamPlaceColor:{defaultValue:null,description:"",name:"teamPlaceColor",required:!0,type:{name:"enum",value:[{value:"0"},{value:"1"},{value:"2"},{value:"3"},{value:"4"},{value:"5"},{value:"6"},{value:"7"},{value:"8"},{value:"9"},{value:"100"}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team/TeamBadge/TeamBadge.tsx#TeamBadge"]={docgenInfo:TeamBadge.__docgenInfo,name:"TeamBadge",path:"src/components/team/TeamBadge/TeamBadge.tsx#TeamBadge"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team/TeamPlaceMenu/TeamPlaceMenu.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TeamPlaceMenu_TeamPlaceMenu});var Menu=__webpack_require__("./src/components/common/Menu/Menu.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),TeamBadge=__webpack_require__("./src/components/team/TeamBadge/TeamBadge.tsx"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const teamInfo=styled_components_browser_esm.iv`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TeamPlaceMenu=props=>{const{displayValue,onSelect}=props,{teamPlaces}=(0,useTeamPlace.l)();return(0,jsx_runtime.jsxs)(Menu.Z,{children:[(0,jsx_runtime.jsxs)(Menu.Z.Button,{type:"button",css:teamPlaceButton,"aria-label":"목록에서 팀 선택하기",title:displayValue,value:displayValue,children:[(0,jsx_runtime.jsx)(Text.Z,{as:"span",weight:"bold",css:teamPlaceName,children:displayValue}),(0,jsx_runtime.jsx)(svg.gV,{})]}),(0,jsx_runtime.jsx)(Menu.Z.List,{onSelect:value=>{onSelect(value)},children:teamPlaces.map((teamPlace=>(0,jsx_runtime.jsxs)(Menu.Z.Item,{value:teamPlace.displayName,css:teamInfo,children:[(0,jsx_runtime.jsx)(TeamBadge.Z,{size:"sm",teamPlaceColor:teamPlace.teamPlaceColor}),teamPlace.displayName]},teamPlace.id)))})]})};TeamPlaceMenu.displayName="TeamPlaceMenu";const TeamPlaceMenu_TeamPlaceMenu=TeamPlaceMenu;try{TeamPlaceMenu.displayName="TeamPlaceMenu",TeamPlaceMenu.__docgenInfo={description:"",displayName:"TeamPlaceMenu",props:{displayValue:{defaultValue:null,description:"",name:"displayValue",required:!0,type:{name:"string"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!0,type:{name:"(value: string) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team/TeamPlaceMenu/TeamPlaceMenu.tsx#TeamPlaceMenu"]={docgenInfo:TeamPlaceMenu.__docgenInfo,name:"TeamPlaceMenu",path:"src/components/team/TeamPlaceMenu/TeamPlaceMenu.tsx#TeamPlaceMenu"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useClickOutside.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const __WEBPACK_DEFAULT_EXPORT__=(ref,callback)=>{(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const handleClickOutside=e=>{ref.current&&!ref.current.contains(e.target)&&callback(e)};return document.addEventListener("mousedown",handleClickOutside),document.addEventListener("touchstart",handleClickOutside),()=>{document.removeEventListener("mousedown",handleClickOutside),document.removeEventListener("touchstart",handleClickOutside)}}),[callback,ref])}},"./src/hooks/useTeamPlace.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>useTeamPlace});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contexts/TeamPlaceContext.tsx");const useTeamPlace=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__.Q);if(void 0===context)throw new Error("useTeamPlace must be used within a TeamPlaceContext");return context}}}]);
//# sourceMappingURL=components-team-TeamPlaceMenu-TeamPlaceMenu-stories.c76a4250.iframe.bundle.js.map