export const fade = {
	initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 0.55, ease: [0.83, 0, 0.17, 1] }
  },
	exit: {
    opacity: 0,
		transition: { duration: 0.55, ease: [0.83, 0, 0.17, 1] }
	}
}

export const fadeDelay = {
	initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { delay: 0.4, duration: 0.65, ease: [0.83, 0, 0.17, 1] }
  },
	exit: {
    opacity: 0,
		transition: { duration: 0.35, ease: [0.83, 0, 0.17, 1] }
	}
}

export const reveal = {
	initial: { y: '120%' },
  enter: { 
    y: 0,
    transition: { duration: 0.65, ease: [0.83, 0, 0.17, 1] }
  },
	exit: {
    y: '120%',
		transition: { duration: 0.65, ease: [0.83, 0, 0.17, 1] }
	}
}