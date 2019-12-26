module.exports = function isDefalutAttrValue(attr, currentValue) {
  const defaultAttrValues = {
    width: 'auto',
    height: 'auto',
    padding: '0px',
    lineHeight: 'normal',
    borderRadius: '0px',
    textAlign: 'start',
    display: '', /* display暂不处理 */
    alignItems: 'normal',
    justifyContent: 'normal',
    flexDirection: 'row',
    position: 'static',
    zIndex: 'auto',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    float: 'none',
    boxShadow: 'none',
    boxSizing: 'content-box',
  }
  return defaultAttrValues[attr] === currentValue
}