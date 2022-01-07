
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
    console.log(sum)
    return sum
}