import { createContext,useMemo,useReducer } from "react";
export const CartContext = createContext();
const reducer=(state,action)=>{
     switch(action.type){
         case "ADD":
            return [...state,{
                id:action.id,
                tempId:action.tempId,
                name:action.name,
                img:action.img,
                price:action.price,
                qty:action.qty,
                size:action.priceoptions
            }];
            case "UPDATE":
             let arr=[...state];
             arr.find((food,index)=>{
                if(food.tempId===action.tempId){
                    arr[index]={
                        ...food,
                        qty:parseInt(action.qty)+parseInt(food.qty),
                        price:parseInt(action.price)+parseInt(food.price)
                    }
                }
             });
             return arr;
            case "REMOVE":
                let arr1=[...state];
                arr1.splice(action.index,1);
                return arr1;
            case "DROP":
                return [];
            default:
                return state;
     }
}
export const CartProvider=({children})=>{
    
    const [state,dispatch]=useReducer(reducer,[]);
     const contextValue=useMemo(()=>{
         return {state,dispatch};
     },[state,dispatch]);
     return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}