
export const formatHistoricalData = () => {
    const formatData = []
    if(historical){
        historical.map(
            ([key,value]) => {
                formatData.push({
                    x: key, 
                    y: [
                        value['open'],
                        value['high'],
                        value['low'],
                        value['close']
                    ]
            }
        )
        }
    )}
    return formatData
}