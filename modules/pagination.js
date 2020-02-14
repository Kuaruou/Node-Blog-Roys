
const convertPagination = function(resource, currentPage) {
    //分頁
    const totalResult = resource.length;
    const perpage = 3; //每頁三筆
    const pageTotal = Math.ceil(totalResult / perpage);
    // let currentPage = 2; //當前頁數
    if (currentPage > pageTotal) {
        currentPage = pageTotal;
    }
    const minItem = (currentPage * perpage) - perpage + 1;//4
    const maxItem = (currentPage * perpage) //6
    //使用結果反推公式
    const data = [];
    resource.forEach(function (item, i) {
        let itemNum = i + 1;
        if (itemNum >= minItem && itemNum <= maxItem) {
            data.push(item);
        }
    });
    const page = {
        pageTotal,
        currentPage,
        hasPre: currentPage > 1,
        hasNext: currentPage < pageTotal,
    }
    return {
        page,
        data
    }
}

module.exports = convertPagination;

