import { Config } from 'windicss/types/interfaces'
import { StyleSheet } from 'windicss/utils/style'
import Processor from 'windicss'

declare global {
  interface Window {
    windicssRuntimeOptions?: {
      timing?: 'immediate' | 'loaded'
      preflight?: boolean
      extractInitial?: boolean
      styleElement?: HTMLStyleElement
      config?: Config
    }
  }
}

(() => {
  if (typeof window === 'undefined') {
    console.warn('[windicss-runtime-dom] this package does not work for non-browser environment')
    return
  }

  const {
    extractInitial = true,
    preflight = true,
    timing = 'immediate',
    config = {},
  } = window.windicssRuntimeOptions || {}

  if (timing === 'loaded')
    window.addEventListener('load', init)

  else
    init()

  function init() {
    let styleElement = window.windicssRuntimeOptions?.styleElement
    if (!styleElement) {
      styleElement = document.createElement('style')
      document.head.appendChild(styleElement)
    }

    const processor = new Processor(config)
    const style = new StyleSheet()

    console.log(
      '%c[windicss] runtime dom enabled %c\nread more at https://github.com/antfu/windicss-runtime-dom',
      'background:#0ea5e9; color:white; padding: 1px 4px; border-radius: 3px;',
      '',
    )

    const visitedClasses = new Set()
    const pendingClasses = new Set()
    const visitedTags = new Set()
    const pendingTags = new Set()

    let _timer: number | undefined

    function include<T>(set: Set<T>, v: T[] | Set<T>) {
      for (const i of v)
        set.add(i)
    }

    function scheduleUpdate() {
      if (_timer != null)
        clearTimeout(_timer)
      _timer = setTimeout(updateStyle, 10) as any
    }

    function updateStyle() {
      if (!pendingClasses.size && !pendingTags.size)
        return

      if (pendingClasses.size) {
        const { styleSheet } = processor.interpret(Array.from(pendingClasses).join(' '))

        include(visitedClasses, pendingClasses)
        pendingClasses.clear()

        style.extend(styleSheet)
      }

      if (pendingTags.size && preflight) {
        const styleSheet = processor.preflight(Array.from(pendingTags).map(i => `<${i}`).join(' '), true, true, true)

        include(visitedTags, pendingTags)
        pendingTags.clear()

        style.extend(styleSheet, true)
      }

      style.sort()

      styleElement!.innerHTML = style.build()
    }

    function addClasses(classes: string[]) {
      let changed = false
      classes.forEach((i) => {
        if (!visitedClasses.has(i)) {
          pendingClasses.add(i)
          changed = true
        }
      })
      return changed
    }

    function addTags(tags: string[]) {
      let changed = false
      tags.forEach((i) => {
        if (!visitedTags.has(i)) {
          pendingTags.add(i)
          changed = true
        }
      })
      return changed
    }

    function extractAll() {
      document.querySelectorAll('*').forEach((i) => {
        addClasses(Array.from<string>(i?.classList || []))
        if (preflight)
          addTags([i.tagName])
      })
      scheduleUpdate()
    }

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const target = mutation.target as Element

        if (mutation.attributeName === 'class' && target) {
          const classes = Array.from<string>(target.classList || [])
          if (addClasses(classes))
            scheduleUpdate()
        }
        if (preflight && target) {
          if (addTags([target.tagName]))
            scheduleUpdate()
        }
      })
    })

    mutationObserver.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    })

    if (extractInitial)
      extractAll()
  }
})()
