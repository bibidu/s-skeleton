function injectScript() {
  chrome.tabs.executeScript(
    null,
    {
      file: 'skeleton-bundle.js',
      allFrames: true
    }
  )
}

document.addEventListener('DOMContentLoaded', function () {
  var generateSkeleton = document.querySelector('.generate-skeleton');
  generateSkeleton.addEventListener('click', () => {
    injectScript()
  })
});
