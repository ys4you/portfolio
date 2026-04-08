import type { ProjectDetail } from "@/types";

/**
 * PROJECT DETAIL CONTENT
 *
 * To add a new project detail page:
 * 1. Add a Project entry in projects.ts (for the card)
 * 2. Add a ProjectDetail entry here (for the detail page)
 * 3. That's it - the router picks it up automatically via slug
 */

export const PROJECT_DETAILS: ProjectDetail[] = [
  // ── Tmpl8 Ray Tracer ────────────────────────────────
  {
    slug: "tmpl8-raytracer",
    meta: {
      role: "Solo Developer",
      duration: "Feb 2025 - Present",
      tools: "C++ · Tmpl8 Framework · SIMD · MagicaVoxel · ImGui",
    },
    sections: [
      {
        type: "text",
        title: "Introduction",
        content:
          "A CPU-based voxel ray tracer built from scratch on the Tmpl8 framework as part of my studies at BUas. The project focuses on real-time rendering of voxel scenes with support for instanced geometry, dynamic lighting, and post-processing effects.",
      },
      {
        type: "video",
        title: "Demo",
        src: "https://www.youtube.com/embed/677SQQsPDNU",
      },
      {
        type: "text",
        title: "Voxel Rendering & Instancing",
        content:
          "The renderer supports MagicaVoxel .vox scene imports and uses a two-level acceleration structure (TLAS/BLAS) with brickmaps for efficient ray traversal. Instanced voxel cubes allow rendering complex scenes like a 3D Conway's Game of Life simulation without duplicating geometry data.",
      },
      {
        type: "code-remote",
        title: "Voxel Instance System",
        language: "cpp",
        src: "https://raw.githubusercontent.com/ys4you/raytracking/fixed-main/VoxelInstance.h",
      },
      {
        type: "text",
        title: "3D Conway's Game of Life",
        content:
          "One of the showcase scenes is a 3D Game of Life running on the grid. I experimented with stable 3D rulesets like Coral, Growth, and Sprawl to find visually interesting patterns that evolve over time. Each alive cell is rendered as an instanced voxel cube.",
      },
      {
        type: "code-remote",
        title: "Living Cube Scene",
        language: "cpp",
        src: "https://raw.githubusercontent.com/ys4you/raytracking/fixed-main/LivingCubeScene.h",
      },
      {
        type: "text",
        title: "Renderer & Scene Management",
        content:
          "The scene system uses a SceneManager that handles transitions, camera state, and event playback. Multiple scenes (GyroscopeScene, HelixScene, InfinityMirrorScene, OrbitCloudScene, etc.) can be switched at runtime through the ImGui interface.",
      },
      {
        type: "code-remote",
        title: "Core Renderer",
        language: "cpp",
        src: "https://raw.githubusercontent.com/ys4you/raytracking/fixed-main/renderer.cpp",
      },
      {
        type: "text",
        title: "Performance",
        content:
          "Performance optimization was a major focus. The FindNearest and IsOccluded functions were profiled and optimized with SIMD intrinsics. The brickmap acceleration structure significantly reduced ray traversal time compared to naive voxel intersection.",
      },
    ],
  },

  // ── Panic 20 ─────────────────────────────────────────
  {
    slug: "panic20",
    meta: {
      role: "Solo Developer",
      duration: "17 Oct 2022 - 21 Oct 2022",
      tools: "C# · Canvas Engine (in-house)",
    },
    sections: [
      {
        type: "callout",
        content:
          "The assets and music used in this project do not belong to me; they are the creations of Toby Fox.",
        variant: "note",
      },
      {
        type: "text",
        title: "Introduction",
        content:
          "In my first school project, I set out on a creative journey with just three weeks of C# and OOP basics under my belt. 'Panic20' was born - a microgame where players roam freely and dodge obstacles. This project epitomizes my early programming prowess and ability to seize creative freedom, even as a beginner, setting the tone for my journey into game development.",
      },
      {
        type: "text",
        title: "Spawning Bones",
        content:
          'Creating bones presented a captivating challenge. I aimed to design two types: shorter ones and longer ones. To achieve this, I created two classes - "Bone" and "BoneShort."\n\nWithin these classes, I seamlessly combined a Bitmap with a rectangular frame to animate the bones gracefully. Additionally, I implemented an efficient AABB collision detection system within the level. This system accurately determined if the player had entered the bone zones, deducting their health as a consequence.',
      },
      {
        type: "code-remote",
        title: "Collision Detection",
        language: "csharp",
        src: "https://raw.githubusercontent.com/ys4you/Panic20/refs/heads/main/Game/LevelOne.cs",
      },
    ],
  },

  // ── Space Fishing ────────────────────────────────────
  {
    slug: "space-fishing",
    meta: {
      role: "Developer (team of 6)",
      team: [
        "Chiel Eikelenboom (Developer)",
        "Norah van Nimwegen (Artist)",
        "Kyrill Oosterveen (Developer)",
        "Lola Prent (Artist)",
        "Yesse Seijnaeve (Developer)",
        "Tijmen Zwaneveld (Artist)",
      ],
      duration: "21 Sep 2023 - 17 Nov 2023",
      tools: "Unity · C# · FSM",
    },
    sections: [
      {
        type: "text",
        title: "Introduction",
        content:
          "This project aimed to publish our own game as part of a team. We had about 8 weeks to plan and create everything. I was part of a team of six, and we strived to create the best game we could. We created the best itch.io page of the year.",
      },
      {
        type: "video",
        title: "Gameplay Demo",
        src: "https://www.youtube.com/embed/fZ_vfsLooEo",
      },
      {
        type: "text",
        title: "My Contributions",
        content:
          "I made two main contributions: the player controller and the dialogue system. Additionally, I created the tutorial. Although a tutorial wasn't initially planned, my team insisted that we include one, so I had to quickly put one together.",
      },
      {
        type: "text",
        title: "Player Controller",
        content:
          "The player controller was implemented using a Finite State Machine (FSM), which I selected due to the uncertainty surrounding the player's full range of abilities. The FSM proved to be an ideal solution, offering flexibility for future expansion while maintaining robust control and preventing unintended alterations.",
      },
      {
        type: "text",
        title: "Dialogue System",
        content:
          'I designed the dialogue system to be as external as possible. To achieve this, I created static utilities that allow the dialogue system to function without dependencies. The only reference it requires is a Scriptable Object (SO), which defines an interaction.\n\nEach line has an "original dialogue text" field. The system performs a text check for specific keywords - such as "player" (replaced with the player\'s name) and "LEFT" (replaced with the corresponding keybind). The system also retrieves the correct speaker sprite through a singleton, loading it on demand if not found.',
      },
    ],
  },

  // ── Landmass Generator ───────────────────────────────
  {
    slug: "landmass-generator",
    meta: {
      role: "Solo Developer",
      duration: "23 Dec 2023 - 29 Jan 2024",
      tools: "Unity · C# · Perlin Noise",
    },
    sections: [
      {
        type: "text",
        title: "Introduction",
        content:
          "This assignment was part of my exam called 'Software Deepening.' I had the freedom to choose a topic in which I wanted to improve. Since I skipped the second year of my studies, I chose to enhance my skills in Unity by using a complex algorithm to generate landmasses.",
      },
      {
        type: "text",
        title: "Snapshot 1: 2D Map Generator",
        content:
          "In the first phase, I focused on setting up Perlin noise, which serves as the foundation for generating landmasses and assigning colors. The Perlin noise values range from 0 to 1, where 1 represents the highest point (snow) and 0 represents deep water.",
      },
      {
        type: "text",
        title: "Snapshot 2: Mesh Generator",
        content:
          "In the second phase, I generated a mesh using an algorithm to create triangles and normals. I primarily followed a Sebastian Lague tutorial, but since parts of it were outdated, I had to handle some of the mesh generation myself using additional references.",
      },
      {
        type: "text",
        title: "Snapshot 3: Final Product",
        content:
          "In the final phase, I created level of detail (LOD) and render distance. I also made the terrain endless using a Viewer object on the player. You set your render distance and adjust the LOD of chunks further away for performance. I also added a simple environment spawner that uses the height map of the Perlin noise, along with an animated water shader.",
      },
    ],
  },

  // ── Syntax Highlighting ──────────────────────────────
  {
    slug: "syntax-highlighting",
    meta: {
      role: "Solo Developer",
      duration: "29 Aug 2024 - 31 Jan 2025",
      tools: "Tree-sitter · JavaScript · VS Code Extension API",
    },
    sections: [
      {
        type: "text",
        title: "Introduction",
        content:
          "During my internship at the Maritime Research Institute Netherlands (MARIN), I was assigned the task of implementing syntax highlighting for their Extensible Modeling Framework (XMF).\n\nTo achieve this, I used Tree-sitter, a parser generation tool developed by GitHub. With Tree-sitter, I created a Visual Studio Code extension to enhance the readability of XMF code.\n\nThe project was divided into two parts: building the parser with Tree-sitter, and building the VS Code extension to display the colors.",
      },
      {
        type: "text",
        title: "Tree-sitter Parser",
        content:
          "The Tree-sitter implementation was written in JavaScript, which includes a domain-specific language (DSL) for defining dynamic tokens.\n\nThe parser processes source code and can detect errors like missing semicolons. If you want to learn more about Tree-sitter, I recommend reading the official documentation at tree-sitter.github.io.",
      },
      {
        type: "text",
        title: "VS Code Extension",
        content:
          "For the extension part, I needed to use the Tree-sitter parser to analyze the source code being edited in Visual Studio Code. The extension hooks into VS Code's extension API to provide real-time syntax highlighting, code folding, and IntelliSense features for XMF files.",
      },
    ],
  },

  // ── Archived ─────────────────────────────────────────

  // ── Goopy ────────────────────────────────────────────
  {
    slug: "goopy",
    meta: {
      role: "Solo Developer",
      team: ["Norah (Artist)", "Tijmen (Artist)", "Yesse (Developer)", "Lola (Artist)"],
      duration: "18 Sep 2023 - 20 Sep 2023 (72h Game Jam)",
      tools: "Unity · C#",
    },
    sections: [
      {
        type: "text",
        title: "My Role",
        content:
          'In a high-pressure 72-hour game jam, I served as the solo developer - managing scene creation, script development, and post-jam bug fixes. Despite the challenges, I successfully delivered a polished and functional game.\n\nI invite you to explore "Goopy," our 2.5D tower defense game reminiscent of the beloved Plants vs. Zombies series.',
      },
      {
        type: "text",
        title: "Grid & Object Instantiation",
        content:
          "Originally assigned to another developer, I assumed responsibility for a crucial script during the game jam. This script played a pivotal role in creating grids, managing unit placement, and instantiating mirrored grids within the game world.",
      },
      {
        type: "code",
        title: "Grid System",
        language: "csharp",
        filename: "ObjectInstantiation.cs",
        code: `public class ObjectInstantiation : MonoBehaviour
{
    public Transform originalGrid;
    public Transform mirroredGrid;
    public GameObject emptySpacePrefab;
    public Vector3 gridCellSize = new Vector3(1.5f, 1f, 1.3f);
    public int numRows = 9;
    public int numColumns = 5;
    public float gridSpacing = 0.1f;

    private void Start()
    {
        CreateGrid(originalGrid);
        CreateMirroredGrid(originalGrid, mirroredGrid);
    }

    private void CreateGrid(Transform grid)
    {
        Vector3 start = transform.position - new Vector3(
            (numColumns - 1) * (gridCellSize.x + gridSpacing) / 2f,
            0f,
            (numRows - 1) * (gridCellSize.z + gridSpacing) / 2f);

        for (int row = 0; row < numRows; row++)
        {
            for (int col = 0; col < numColumns; col++)
            {
                Vector3 pos = start + new Vector3(
                    col * (gridCellSize.x + gridSpacing),
                    0f,
                    row * (gridCellSize.z + gridSpacing));
                Instantiate(emptySpacePrefab, pos, Quaternion.identity, grid);
            }
        }
    }
}`,
      },
    ],
  },

  // ── 2D Platformer ────────────────────────────────────
  {
    slug: "2d-platformer",
    meta: {
      role: "Solo Developer",
      duration: "28 Nov 2022 - 9 Dec 2022",
      tools: "Unity · C#",
    },
    sections: [
      {
        type: "text",
        title: "Introduction",
        content:
          "The 2D platformer I crafted focuses on surmounting a series of demanding challenges across three distinct levels. The aim is to successfully maneuver through each level and reach the finish line while avoiding any interruptions. I completed the development within a two-week period.",
      },
      {
        type: "text",
        title: "Player Movement",
        content:
          "Players can perform several actions: walking, jumping, double jumping, wall jumping, and sliding off walls. Despite these capabilities, the game maintains a deliberate pace - rewarding careful movement and precise control to navigate obstacles effectively.",
      },
      {
        type: "code",
        title: "Player Movement System",
        language: "csharp",
        filename: "PlayerMovement.cs",
        code: `public class PlayerMovement : MonoBehaviour
{
    private Rigidbody2D rb;
    private BoxCollider2D coll;
    private Animator anim;
    private float dirX = 0f;

    [SerializeField] private float moveSpeed = 7f;
    [SerializeField] private float jumpForce = 14f;
    [SerializeField] private LayerMask jumpableGround;

    private enum MovementState
    {
        idle, running, jumping, falling, on_wall
    }

    private float wallJumpTime = 0.2f;
    private float wallSlideSpeed = 0.1f;
    private float wallDistance = 0.58f;
    private bool isWallSliding = false;
    private bool isFacingRight = true;
}`,
      },
    ],
  },

  // ── Rollover: Marble Mayhem ──────────────────────────
  {
    slug: "rollover",
    meta: {
      role: "Solo Developer",
      duration: "13 Mar 2023 - 7 Apr 2023",
      tools: "Unity · C#",
    },
    sections: [
      {
        type: "text",
        title: "Introduction",
        content:
          "Rollover is a game about controlling multiple marbles - you guide them in sequence. Experience multiple levels and explore from platformer to adventure.",
      },
      {
        type: "text",
        title: "Leaderboard System",
        content:
          'The "FinishRequirements" script checks for level completion by confirming that all marbles are on buttons. If successful, it marks the level as complete, updates personal best times, and returns players to the lobby.',
      },
      {
        type: "code",
        title: "Level Completion Logic",
        language: "csharp",
        filename: "FinishRequirements.cs",
        code: `public class FinishRequirements : MonoBehaviour
{
    [SerializeField] private CheckingButton[] _buttons;
    [SerializeField] private LevelManager data;
    [SerializeField] private GameManager _gameManager;

    private bool AreAllMarblesOnButtons()
    {
        foreach (CheckingButton button in _buttons)
        {
            if (!button.playerIsOnButton)
                return false;
        }
        return true;
    }

    private void SendPlayerBackToLobby()
    {
        if (AreAllMarblesOnButtons())
        {
            int idx = SceneManager.GetActiveScene().buildIndex - 1;
            data.CompletedLevel[idx] = true;
            SettingPersonalBest();
            SceneManager.LoadScene("lobby");
        }
    }
}`,
      },
    ],
  },
];

/** Quick lookup by slug */
export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS.find((p) => p.slug === slug);
}