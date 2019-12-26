function injectSkeletonBundle() {
  chrome.tabs.executeScript(
    null,
    {
      file: 'skeleton-bundle.js',
      allFrames: true
    }
  )
}

function injectSaveSkeleton() {
  chrome.tabs.executeScript(
    null,
    {
      file: 'save-skeleton.js',
      allFrames: true
    }
  )
}

document.addEventListener('DOMContentLoaded', function () {
  const generateSkeleton = document.querySelector('.generate-skeleton');
  const saveSkeleton = document.querySelector('.save-skeleton');
  generateSkeleton.addEventListener('click', () => {
    injectSkeletonBundle()
  })
  saveSkeleton.addEventListener('click', () => {
    injectSaveSkeleton()
  })
});
