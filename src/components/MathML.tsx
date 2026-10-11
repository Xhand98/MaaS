"use client"

type MathMLProps = {
  mathml: string
}
export default function MathML({ mathml }: MathMLProps) {
  return (<div className="math-result"
    dangerouslySetInnerHTML={{__html: mathml}}>

</div>)
}
