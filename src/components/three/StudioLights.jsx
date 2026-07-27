import { Environment, Lightformer, SpotLight } from '@react-three/drei'

const StudioLights = () => {
  return (
    <group name='lights'>
        <Environment>
            <group>
                <Lightformer 
                    form="rect"
                    intensity={10}
                    scale={10}
                    rotation-x={Math.PI / 2}
                    position={[-10,5,-5]}
                />
                <Lightformer 
                    form="rect"
                    intensity={10}
                    scale={10}
                    rotation-x={Math.PI * 0.2}
                    position={[10,0,1]}
                />
            </group>
        </Environment>
        <SpotLight 
            position={[0, 15, 5]}
            angle={0.15}
            decay={0.1}
            intensity={Math.PI * 1}
        />
    </group>
  )
}

export default StudioLights