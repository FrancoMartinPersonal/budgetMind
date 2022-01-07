
export  function dateNormalFormat(date:string) {
    let shortDate:string = ""
    let sum:number=0
   
   
    return date?.slice(0,10)
}

export   const sumOfAmounts = (e: any) => {
    let sum: number = 0;
    for (let index = 0; index < e?.length; index++) {
        sum = sum + e[index]?.amount;

    }

    return sum
}

// export const typeFormatting = (var:any,set:any) => {
//     if (var.type == "+") {
//         set({
//             ...var,
//             amount: Number(+var.amount)
//         })
//     } else if (var.type == "-") {
//         let numberNeg = Number(-var.amount)
//         numberNeg = -numberNeg
//         console.log(numberNeg, 'number before')
//         set({
//             ...var,
//             amount: numberNeg
//         })
//     }
// }