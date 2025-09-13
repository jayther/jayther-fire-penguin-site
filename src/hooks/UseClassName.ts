import { useMemo } from "react"

const useClassName = (...classes: (string | boolean)[]) => {
  const className = classes.filter(Boolean).join(' ')

  const memoizedClassName = useMemo(() => className, [className])

  return memoizedClassName
}

export default useClassName
