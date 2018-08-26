//常用js工具函数

/**
 * 千位分隔符
 */
function thousandBitSeparator(num) {
    var source = num.toString().split(".");//按小数点分成2部分
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
    return source.join(".");
}