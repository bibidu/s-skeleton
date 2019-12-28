function injectSkeletonBundle() {
  chrome.tabs.executeScript(
    null,
    {
      file: 'skeleton-bundle.js',
      allFrames: true
    }
  )
}

document.addEventListener('DOMContentLoaded', function () {
  const generateSkeleton = document.querySelector('.generate-skeleton')

  generateSkeleton.addEventListener('click', () => {
    injectSkeletonBundle()
  })
});

