import Link from 'next/link'
import Logo from '@/components/logo'
import { m } from 'framer-motion'
import { reveal } from '@/helpers/transitions'

export default function Ticker({href, word1, word2}) {
  return (    
    <Link href={href}>
      <a className="overflow-hidden mx-[-5vw] md:mx-[-3vw] xl:mx-[-2vw] pt-[4vw]">
        <div className="w-full bg-pink dark:bg-yellow rotate-[3deg] whitespace-nowrap text-off-black font-display uppercase tracking-tight text-[4vw] md:text-[2.25vw] xl:text-[2vw] mb-[18vw] md:mb-[14vw] py-[1.5vw] md:py-[1vw] xl:py-[0.5vw] transition-colors ease-in-out duration-500">
          <div className="relative overflow-hidden">
            <m.div variants={reveal}>
              <div className="relative flex overflow-x-hidden will-change">
                <div className="motion-safe:animate-marquee whitespace-nowrap flex items-center">
                  <span className="mx-3">{word1}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word2}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word1}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word2}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word1}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word2}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word1}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word2}</span>
                  <span className="mx-3"><Logo ticker/></span>
                </div>

                <div className="absolute top-0 motion-safe:animate-marquee2 whitespace-nowrap flex items-center">
                  <span className="mx-3">{word1}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word2}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word1}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word2}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word1}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word2}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word1}</span>
                  <span className="mx-3"><Logo ticker/></span>
                  <span className="mx-3">{word2}</span>
                  <span className="mx-3"><Logo ticker/></span>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </a>
    </Link>
  )
}