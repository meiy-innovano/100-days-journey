import * as THREE from 'three'
import Project from './Project'
import gsap from 'gsap'

export default class ProjectsSection {
    constructor(_options) {
        // Options
        this.time = _options.time
        this.resources = _options.resources
        this.camera = _options.camera
        this.passes = _options.passes
        this.objects = _options.objects
        this.areas = _options.areas
        this.zones = _options.zones
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder('projects')
            this.debugFolder.open()
        }

        // Set up
        this.items = []

        this.interDistance = 24
        this.positionRandomess = 5
        this.projectHalfWidth = 9

        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.container.updateMatrix()

        this.setGeometries()
        this.setMeshes()
        this.setList()
        this.setZone()

        // Add all project from the list
        for (const _options of this.list) {
            this.add(_options)
        }
    }

    setGeometries() {
        this.geometries = {}
        this.geometries.floor = new THREE.PlaneGeometry(16, 8)
    }

    setMeshes() {
        this.meshes = {}

        // this.meshes.boardStructure = this.objects.getConvertedMesh(this.resources.items.projectsBoardStructure.scene.children, { floorShadowTexture: this.resources.items.projectsBoardStructureFloorShadowTexture })
        this.resources.items.areaOpenTexture.magFilter = THREE.NearestFilter
        this.resources.items.areaOpenTexture.minFilter = THREE.LinearFilter
        this.meshes.boardPlane = this.resources.items.projectsBoardPlane.scene.children[0]
        this.meshes.areaLabel = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.5), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, color: 0xffffff, alphaMap: this.resources.items.areaOpenTexture }))
        this.meshes.areaLabel.matrixAutoUpdate = false
    }

    setList() {
        this.list = [
            {
                name: 'Theme 1',
                imageSources:
                    [
                        './models/projects/theme1/slideA.webp',
                        './models/projects/theme1/slideB.webp',
                        './models/projects/theme1/slideC.webp',
                        './models/projects/theme1/slideD.webp'
                    ],
                floorTexture: this.resources.items.projectsThreejsJourneyFloorTexture,
                link:
                {
                    href: 'https://threejs-journey.com?c=p3',
                    x: - 3.8,
                    y: - 5,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                    [
                        { type: 'fwa', x: 3.95, y: 4.15 }
                    ]
            },
            {
                name: 'Theme 2',
                imageSources:
                    [
                        './models/projects/theme2/slideA.jpg',
                        './models/projects/theme2/slideB.jpg',
                        './models/projects/theme2/slideC.jpg'
                    ],
                floorTexture: this.resources.items.projectsChartogneFloorTexture,
                link:
                {
                    href: 'https://chartogne-taillet.com',
                    x: - 2.8,
                    y: - 5.3,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                    [
                        { type: 'awwwards', x: 3.95, y: 4.15 },
                        { type: 'fwa', x: 5.6, y: 4.15 },
                        { type: 'cssda', x: 7.2, y: 4.15 }
                    ]
            },
            {
                name: 'Theme 3',
                imageSources:
                    [
                        './models/projects/theme3/slideA.webp',
                        './models/projects/theme3/slideB.webp',
                        './models/projects/theme3/slideC.webp',
                        './models/projects/theme3/slideD.webp'
                    ],
                floorTexture: this.resources.items.projectsBonhomme10ansFloorTexture,
                link:
                {
                    href: 'https://anniversary.bonhommeparis.com/',
                    x: - 2.8,
                    y: - 5.4,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                    [
                        { type: 'awwwards', x: 3.95, y: 4.15 },
                        { type: 'fwa', x: 5.6, y: 4.15 },
                    ]
            },
            {
                name: 'Theme 4',
                imageSources:
                    [
                        './models/projects/theme4/slideA.webp',
                        './models/projects/theme4/slideB.webp',
                        './models/projects/theme4/slideC.webp',
                        './models/projects/theme4/slideD.webp'
                    ],
                floorTexture: this.resources.items.projectsLuniFloorTexture,
                link:
                {
                    href: 'https://luni.app',
                    x: - 2.8,
                    y: - 5.3,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                    [
                        { type: 'awwwards', x: 3.95, y: 4.15 },
                        { type: 'fwa', x: 5.6, y: 4.15 },
                    ]
            },
            {
                name: 'Theme 5',
                imageSources:
                    [
                        './models/projects/theme5/slideA.jpg',
                        './models/projects/theme5/slideB.jpg',
                        './models/projects/theme5/slideC.jpg'
                    ],
                floorTexture: this.resources.items.projectsMadboxFloorTexture,
                link:
                {
                    href: 'https://madbox.io',
                    x: - 3.8,
                    y: - 6,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                    [
                        { type: 'awwwards', x: 3.95, y: 4.15 },
                        { type: 'fwa', x: 5.6, y: 4.15 }
                    ]
            },
            {
                name: 'Theme 6',
                imageSources:
                    [
                        './models/projects/theme6/slideA.jpg',
                        './models/projects/theme6/slideB.jpg',
                        './models/projects/theme6/slideC.jpg'
                    ],
                floorTexture: this.resources.items.projectsScoutFloorTexture,
                link:
                {
                    href: 'https://fromscout.com',
                    x: - 3.8,
                    y: - 5.8,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                    [
                    ]
            },
            // {
            //     name: 'Zenly',
            //     imageSources:
            //     [
            //         './models/projects/zenly/slideA.jpg',
            //         './models/projects/zenly/slideB.jpg',
            //         './models/projects/zenly/slideC.jpg'
            //     ],
            //     floorTexture: this.resources.items.projectsZenlyFloorTexture,
            //     link:
            //     {
            //         href: 'https://zen.ly',
            //         x: - 4.8,
            //         y: - 4.2,
            //         halfExtents:
            //         {
            //             x: 3.2,
            //             y: 1.5
            //         }
            //     },
            //     distinctions:
            //     [
            //         { type: 'awwwards', x: 3.95, y: 4.15 },
            //         { type: 'fwa', x: 5.6, y: 4.15 },
            //         { type: 'cssda', x: 7.2, y: 4.15 }
            //     ]
            // },
            {
                name: 'Theme 7',
                imageSources:
                    [
                        './models/projects/theme7/slideA.jpg',
                        './models/projects/theme7/slideB.jpg',
                        './models/projects/theme7/slideC.jpg'
                    ],
                floorTexture: this.resources.items.projectsPriorHoldingsFloorTexture,
                link:
                {
                    href: 'https://prior.co.jp/discover/',
                    x: - 3.8,
                    y: - 5.5,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                    [
                        { type: 'awwwards', x: 3.95, y: 4.15 },
                        { type: 'fwa', x: 5.6, y: 4.15 },
                        { type: 'cssda', x: 7.2, y: 4.15 }
                    ]
            },
            {
                name: 'Theme 8',
                imageSources:
                    [
                        './models/projects/theme8/slideA.jpg',
                        './models/projects/theme8/slideB.jpg',
                        './models/projects/theme8/slideC.jpg'
                    ],
                floorTexture: this.resources.items.projectsOranoFloorTexture,
                link:
                {
                    href: 'https://orano.imm-g-prod.com/experience/innovation/en',
                    x: - 3.8,
                    y: - 5.4,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                    [
                        { type: 'awwwards', x: 3.95, y: 4.15 },
                        { type: 'fwa', x: 5.6, y: 4.15 },
                        { type: 'cssda', x: 7.2, y: 4.15 }
                    ]
            },
            {
                name: 'Theme 9',
                imageSources:
                    [
                        './models/projects/theme9/slideA.jpg',
                        './models/projects/theme9/slideB.jpg',
                        './models/projects/theme9/slideC.jpg'
                    ],
                floorTexture: this.resources.items.projectsCitrixRedbullFloorTexture,
                link:
                {
                    href: 'https://thenewmobileworkforce.imm-g-prod.com/',
                    x: - 3.8,
                    y: - 5.4,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                    [
                        { type: 'awwwards', x: 3.95, y: 4.15 },
                        { type: 'fwa', x: 5.6, y: 4.15 },
                        { type: 'cssda', x: 7.2, y: 4.15 }
                    ]
            },
            {
                name: 'Theme 10',
                imageSources:
                    [
                        './models/projects/theme10/slideA.jpg',
                        './models/projects/theme10/slideB.jpg',
                        './models/projects/theme10/slideC.jpg',
                        './models/projects/theme10/slideD.jpg'
                    ],
                floorTexture: this.resources.items.projectsGleecChatFloorTexture,
                link:
                {
                    href: 'http://gleec.imm-g-prod.com',
                    x: - 3.8,
                    y: - 5.4,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                    [
                        { type: 'awwwards', x: 3.95, y: 4.15 },
                        { type: 'fwa', x: 5.6, y: 4.15 },
                        { type: 'cssda', x: 7.2, y: 4.15 }
                    ]
            },
            // {
            //     name: 'keppler',
            //     imageSources:
            //     [
            //         './models/projects/keppler/slideA.jpg',
            //         './models/projects/keppler/slideB.jpg',
            //         './models/projects/keppler/slideC.jpg'
            //     ],
            //     floorTexture: this.resources.items.projectsKepplerFloorTexture,
            //     link:
            //     {
            //         href: 'https://brunosimon.github.io/keppler/',
            //         x: 2.75,
            //         y: - 1.1,
            //         halfExtents:
            //         {
            //             x: 3.2,
            //             y: 1.5
            //         }
            //     },
            //     distinctions: []
            // }
        ]
    }

    setZone() {
        const totalWidth = this.list.length * (this.interDistance / 2)

        const zone = this.zones.add({
            position: { x: this.x + totalWidth - this.projectHalfWidth - 6, y: this.y },
            halfExtents: { x: totalWidth, y: 12 },
            data: { cameraAngle: 'projects' }
        })

        zone.on('in', (_data) => {
            this.camera.angle.set(_data.cameraAngle)
            gsap.to(this.passes.horizontalBlurPass.material.uniforms.uStrength.value, { x: 0, duration: 2 })
            gsap.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, { y: 0, duration: 2 })
        })

        zone.on('out', () => {
            this.camera.angle.set('default')
            gsap.to(this.passes.horizontalBlurPass.material.uniforms.uStrength.value, { x: this.passes.horizontalBlurPass.strength, duration: 2 })
            gsap.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, { y: this.passes.verticalBlurPass.strength, duration: 2 })
        })
    }

    add(_options) {
        const x = this.x + this.items.length * this.interDistance
        let y = this.y
        if (this.items.length > 0) {
            y += (Math.random() - 0.5) * this.positionRandomess
        }

        // Create project
        const project = new Project({
            time: this.time,
            resources: this.resources,
            objects: this.objects,
            areas: this.areas,
            geometries: this.geometries,
            meshes: this.meshes,
            debug: this.debugFolder,
            x: x,
            y: y,
            ..._options
        })

        this.container.add(project.container)

        // Add tiles
        if (this.items.length >= 1) {
            const previousProject = this.items[this.items.length - 1]
            const start = new THREE.Vector2(previousProject.x + this.projectHalfWidth, previousProject.y)
            const end = new THREE.Vector2(project.x - this.projectHalfWidth, project.y)
            const delta = end.clone().sub(start)
            this.tiles.add({
                start: start,
                delta: delta
            })
        }

        // Save
        this.items.push(project)
    }
}
