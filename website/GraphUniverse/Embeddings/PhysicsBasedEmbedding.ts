import Vertex from "@/GraphUniverse/Graph/Vertex";
import GraphUniverse from "@/GraphUniverse/GraphUniverse";
import Embedding from "@/GraphUniverse/Embeddings/Embedding";
import Matter, {Bodies, Constraint, Engine, World} from "matter-js";

export default class PhysicsBasedEmbedding<T> implements Embedding<T> {
    private static readonly META_PROPERTY_NAME: string = "physics-render-object";

    private readonly engine: Engine;
    private readonly universe: GraphUniverse<any>;

    constructor(graphUniverse: GraphUniverse<any>) {
        this.engine = Engine.create({
            gravity: {x: 0, y: 0},
        });
        this.universe = graphUniverse;
    }

    initialize(): void {
        this.universe.listener.addEventListener("vertexAddedEvent", event => {
            const newPhysicVertex = this.addVertex(event.x, event.y);

            event.vertex.addMeta(
                PhysicsBasedEmbedding.META_PROPERTY_NAME,
                newPhysicVertex
            );
        });

        this.universe.listener.addEventListener("edgeAddedEvent", event => {
            this.handleNewEdge(event.sourceVertex, event.targetVertex);
        });
    }


    private move(delta: number): void {
        Engine.update(this.engine, delta);

        this.universe.graph.getAllNodes().forEach(graphNode => {
            const body = graphNode.getMeta<Matter.Body>(PhysicsBasedEmbedding.META_PROPERTY_NAME);

            console.log(body, graphNode);
            this.universe.renderingController.moveVertex(
                graphNode,
                body.position.x,
                body.position.y
            );
        });
    }

    private handleNewEdge(firstVertex: Vertex<any>, secondVertex: Vertex<any>): void {
        const secondBody = secondVertex.getMeta<Matter.Body>(PhysicsBasedEmbedding.META_PROPERTY_NAME);
        const firstBody = firstVertex.getMeta<Matter.Body>(PhysicsBasedEmbedding.META_PROPERTY_NAME);

        const constraint = Constraint.create({
            bodyA: firstBody,
            bodyB: secondBody,
            damping: 1,
            stiffness: 1/100,
            length: 100
        });

        World.addConstraint(this.engine.world, constraint);
    }

    private addVertex(x: number, y: number): Matter.Body {
        const particle = Bodies.circle(
            x,
            y,
            20
        );

        particle.restitution = 10;

        World.add(this.engine.world, particle);

        return particle;
    }

    public update(delta: number): void {
        this.move(delta / 1000);
    }
}