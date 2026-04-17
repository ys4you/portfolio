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
  // ── CPU Ray Tracer ────────────────────────────────
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
          "A voxel ray tracer I'm building from scratch in C++ as part of my studies at BUas. It renders voxel scenes in real-time with instanced geometry, dynamic lights, and some post-processing on top.",
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
          "It can load MagicaVoxel .vox scenes and uses a two-level acceleration structure (TLAS/BLAS) with brickmaps to keep ray traversal fast. Instancing means I can render tons of voxel cubes - like a 3D Game of Life - without copying all the geometry data.",
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
          "One of the cooler scenes is a 3D Game of Life. I tried a bunch of different 3D rulesets (Coral, Growth, Sprawl) to find ones that look interesting as they evolve. Each living cell is just an instanced voxel cube.",
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
          "I built a scene system with a SceneManager that handles transitions and camera state. There are a bunch of different scenes (Gyroscope, Helix, InfinityMirror, OrbitCloud, etc.) and you can switch between them at runtime through ImGui.",
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
          "Performance was a big focus. I profiled the hot paths (FindNearest, IsOccluded) and optimized them with SIMD. The brickmap structure made a huge difference compared to just checking every voxel.",
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
          "This was literally my first school project ever. I had about 3 weeks of C# under my belt and just went for it. Panic20 is a simple dodge game - you move around and try not to get hit for 20 seconds. Nothing crazy, but it's where it all started.",
      },
      {
        type: "text",
        title: "Spawning Bones",
        content:
          'I made two types of bones as obstacles - long and short ones. Each bone class combines a sprite with a hitbox and gets animated using a rectangular frame.\n\nFor collision I used AABB detection - when the player walks into a bone zone, they lose health. Simple but it works.',
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
      tools: "Unity · C# · FSM · Scriptable Objects",
    },
    sections: [
      {
        type: "text",
        title: "Introduction",
        content:
          "This was our first published game as a team. We had 8 weeks with 6 people to plan, build, and ship something. We ended up winning best itch.io page of the year in our class, which was pretty cool.",
      },
      {
        type: "text",
        title: "My Contributions",
        content:
          "I was responsible for two major systems: the player controller and the dialogue system. I also built the tutorial, which wasn't originally planned but the team decided we needed one late in development, so I had to put it together quickly.",
      },
      {
        type: "text",
        title: "Player Controller (FSM)",
        content:
          "I chose a Finite State Machine pattern for the player controller because we weren't sure early on what the full range of player abilities would be. The FSM made it easy to add new states later without breaking existing behavior.\n\nThe architecture has a central PlayerStateMachine that manages state transitions, a PlayerBaseState that all states inherit from, a PlayerStateFactory that creates state instances, and concrete states for each behavior (Idle, Walk, Jump, Grounded).",
      },
      {
        type: "code-remote",
        title: "State Machine Core",
        language: "csharp",
        src: "https://raw.githubusercontent.com/ys4you/space-fishing/main/Assets/_project/Scripts/FSM%20player/PlayerStateMachine.cs",
      },
      {
        type: "code-remote",
        title: "Base State Pattern",
        language: "csharp",
        src: "https://raw.githubusercontent.com/ys4you/space-fishing/main/Assets/_project/Scripts/FSM%20player/PlayerBaseState.cs",
      },
      {
        type: "code-remote",
        title: "Walk State Implementation",
        language: "csharp",
        src: "https://raw.githubusercontent.com/ys4you/space-fishing/main/Assets/_project/Scripts/FSM%20player/PlayerWalkState.cs",
      },
      {
        type: "code-remote",
        title: "State Factory",
        language: "csharp",
        src: "https://raw.githubusercontent.com/ys4you/space-fishing/main/Assets/_project/Scripts/FSM%20player/PlayerStateFactory.cs",
      },
      {
        type: "text",
        title: "Dialogue System",
        content:
          "I designed the dialogue system to be as decoupled as possible. The core logic lives in static utility functions so it has zero dependencies on scene objects. The only data it needs is a Scriptable Object that defines an interaction, which is an array of DialogueLine objects.\n\nEach line has an \"original dialogue text\" field where the system scans for keywords like \"player\" (replaced with the actual player name from the GameManager) and keybind tokens like \"LEFT\" (replaced with whatever key the player has bound for that action).\n\nThe DialogueSpriteManager is a singleton that loads and caches character sprites on demand. When a dialogue line specifies a speaker and sprite name, the manager retrieves the correct sprite, loading it from Resources if it hasn't been cached yet.",
      },
      {
        type: "code-remote",
        title: "Dialogue Manager",
        language: "csharp",
        src: "https://raw.githubusercontent.com/ys4you/space-fishing/main/Assets/_project/Scripts/Dialogue/DialogueManager.cs",
      },
      {
        type: "code-remote",
        title: "Dialogue Utilities (Keyword Replacement)",
        language: "csharp",
        src: "https://raw.githubusercontent.com/ys4you/space-fishing/main/Assets/_project/Scripts/Dialogue/DialogueUtilities.cs",
      },
      {
        type: "code-remote",
        title: "Sprite Manager (Singleton)",
        language: "csharp",
        src: "https://raw.githubusercontent.com/ys4you/space-fishing/main/Assets/_project/Scripts/Dialogue/DialogueSpriteManager.cs",
      },
      {
        type: "code-remote",
        title: "Dialogue Line Data Structure",
        language: "csharp",
        src: "https://raw.githubusercontent.com/ys4you/space-fishing/main/Assets/_project/Scripts/Dialogue/DialogueLine.cs",
      },
      {
        type: "code-remote",
        title: "Typewriter Text Effect",
        language: "csharp",
        src: "https://raw.githubusercontent.com/ys4you/space-fishing/main/Assets/_project/Scripts/Dialogue/TypewriterEffect.cs",
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
          "This was my exam project for 'Software Deepening.' I got to pick what I wanted to learn, and since I skipped second year, I wanted to challenge myself with something harder. So I went with procedural terrain generation in Unity.",
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

  // ── Blog Database & API ───────────────────────────────
  {
    slug: "database-tool",
    meta: {
      role: "Backend Developer",
      team: ["Coen (Frontend)", "Yesse (Backend & Frontend Assistance)"],
      duration: "29 Jan 2024 - 19 Apr 2024",
      tools: "PHP · MySQL · JavaScript · HTML/CSS · XAMPP",
    },
    sections: [
      {
        type: "text",
        title: "Introduction",
        content:
          "My first real backend project. I set up a XAMPP server and built the whole API around a single endpoint - /api.php. You just send a JSON payload with an \"action\" field and it does the thing. Kept it simple so anyone on the team could use it.",
      },
      {
        type: "text",
        title: "User Authentication",
        content:
          "Login gives you a token that gets saved in localStorage and the database. Every API call checks that token to make sure it's actually you. If you're afk for 10 minutes or log out, the token gets wiped and you're back at the login screen.",
      },
      {
        type: "text",
        title: "Blog & Styling System",
        content:
          "The database has 3 tables linked to blogs: \"Websites\", \"Styling\", and \"WebsiteStyling\". The Websites table contains the blog data. The Styling table holds boolean values tracking what styling tasks are complete. WebsiteStyling is a junction table linking websites to their styling progress, making it quick to look up the styling status of any website.",
      },
      {
        type: "text",
        title: "Activity Logging",
        content:
          "Everything important gets logged - creating users, deleting blogs, posting to websites. It all goes into an Activitylog table with timestamps so you can see who did what and when.",
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
          "During my internship at MARIN, I had to build syntax highlighting for their in-house programming language called XMF.\n\nI used Tree-sitter (a parser tool made by GitHub) to parse the language, then built a VS Code extension on top of it. The project had two main parts: making the parser understand XMF, and making VS Code actually show the colors.",
      },
      {
        type: "text",
        title: "Tree-sitter Parser",
        content:
          "The parser is written in JavaScript using Tree-sitter's DSL for defining tokens and grammar rules. It can parse XMF source code and catch errors like missing semicolons.",
      },
      {
        type: "text",
        title: "VS Code Extension",
        content:
          "For the VS Code side, I hooked the Tree-sitter parser into the extension API so it analyzes your code as you type. It gives you syntax highlighting, code folding, and basic IntelliSense - all in real time.",
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
          "72-hour game jam, and I was the only developer on the team. Built all the scenes, wrote all the scripts, and fixed bugs after the jam ended. It's a 2.5D tower defense game, kind of like Plants vs. Zombies but with mirrored grids.",
      },
      {
        type: "text",
        title: "Grid & Object Instantiation",
        content:
          "The grid system was originally supposed to be someone else's job, but I ended up taking it over during the jam. It handles creating the grids, placing units, and mirroring everything to the second grid.",
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
          "A platformer I built in about two weeks. Three levels, each one harder than the last. You just need to get to the end without dying.",
      },
      {
        type: "text",
        title: "Player Movement",
        content:
          "The player can walk, jump, double jump, wall jump, and slide off walls. Sounds like a lot of movement options, but the levels are designed so you actually need all of them to get through.",
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
          '"The FinishRequirements script checks if all marbles are sitting on their buttons. If they are, it marks the level as done, saves your best time, and sends you back to the lobby."',
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