// Portfolio content data
// This file is intentionally plain JavaScript so it works on GitHub Pages with no build step.
//
// EDIT AN ENTRY: change its object in ENTRY_LIBRARY below.
// ADD / REMOVE / REORDER AN ENTRY: edit one line in the section entries lists near the bottom, e.g. ENTRY_LIBRARY.tampPanda,
// ADD MEDIA: place the file in assets/images, assets/videos, or assets/docs, then reference it with a relative path.

const ENTRY_LIBRARY = {
  // Think Again: Augmenting Rigidly Safe Plans with General Safety Awareness Using LLMs
  thinkAgain: {
    "id": "think-again",
    "type": "Research",
    "title": "Think Again: Augmenting Rigidly Safe Plans with General Safety Awareness Using LLMs",
    "summary": "Hybrid LTL/LLM planning system that preserves formal mission specifications while using LLM hazard predictions to improve plans with broader contextual understanding.",
    "topics": [
      "formal-methods",
      "task-planning",
      "ros-2",
      "simulation",
      "machine-learning"
    ],
    "meta": {
      "Role": "Researcher / Developer",
      "Tools": "Python, ROS 2, LTL, A*, weighted automata, LLMs",
      "Timeline": "Aug 2025 – Sept 2026",
      "Team": "3-person MQP / research team",
      "Status": "preparing to submit to ICRA"
    },
    "descriptions": [
      {
            "label": "Overview",
            "text": "Robot planners usually operate on simplified abstractions of real systems. An environment may be reduced to a set of labels or states, making planning and verification tractable. That abstraction is also a source of risk: a plan that satisfies a Linear Temporal Logic specification may still be unsafe due to hazards that are not modelled and cannot be planned around."
      },
      {
            "label": "Technical Approach",
            "text": "Think Again preserves the formal planning layer while adding LLM-informed contextual risk analysis. The LLM receives information about the robot, environment, and mission parameters, then evaluates how executing an could go wrong. Those predictions are scored and applied as weights over the planning representation, allowing state-aware A* to search for paths that satisfy the LTL specification while avoiding likely emergent hazards."
      },
      {
            "label": "Outcome",
            "text": "The planner showed capabilities to account for hazards that were neither modeled in the automaton nor directly specified to the LLM. Across sveral scenarios, Think Again was able to predict and avoid several hazards using only information about an environment and the task being performed."
      }
],
    "tags": [
      "LTL",
      "LLMs",
      "ROS 2",
      "A*",
      "Robot Safety"
    ],
    "featuredMedia": {
      "type": "video",
      "src": "assets/videos/think_again_stretch.mp4",
      "poster": "assets/images/think_again_pipeline.jpg",
      "fallback": "assets/images/think_again_pipeline.jpg",
      "caption": "Stretch hardware execution",
      "alt": "Think Again planning pipeline"
    },
    "media": [
      {
        "type": "video",
        "src": "assets/videos/think_again_stretch.mp4",
        "poster": "assets/images/think_again_pipeline.jpg",
        "caption": "Stretch hardware execution",
        "alt": "Stretch execution"
      },
      {
        "type": "image",
        "src": "assets/images/think_again_pipeline.jpg",
        "fallback": "assets/images/think_again_pipeline.jpg",
        "caption": "Full Think Again pipeline",
        "alt": "Think Again system pipeline from command to safety-aware plan",
        "blurb": "End-to-end flow from a natural-language task through task formalization, LLM hazard scoring, weight application, and state-aware A* planning."
      },
      {
        "type": "image",
        "src": "assets/images/think_again_results_panel.jpg",
        "fallback": "assets/images/think_again_results_panel.jpg",
        "caption": "Think Again results panel",
        "alt": "Poster crop showing Think Again simulation results, method comparisons, and Stretch hardware demo",
        "blurb": "Poster results crop showing how the planner changes paths across conference-room, storage-closet, certified-safe, and coffee-carrying scenarios while preserving the LTL task requirements. The panel also includes comparison trials and the Unity Hall Stretch hardware demo."
      },
      {
        "type": "image",
        "src": "assets/images/think_again_poster.jpg",
        "fallback": "assets/images/think_again_poster.jpg",
        "caption": "Think Again MQP poster",
        "alt": "Think Again poster summarizing the LTL and LLM-informed safety planning pipeline",
        "blurb": "Poster overview of the project, including the formal-methods planning foundation, the Think Again pipeline, the hazard-weighting algorithm, simulation comparisons, and the Stretch hardware demonstration."
      }
    ],
    "links": [
      {
        "label": "Report PDF",
        "href": "assets/docs/Think_Again_Report.pdf",
        "type": "pdf"
      },
      {
        "label": "Poster PDF",
        "href": "assets/docs/Think_Again_Poster.pdf",
        "type": "pdf"
      }
    ]
  },
  // MASTAH: Minimum Auction Spanning Task Assignment Hierarchy
  mastah: {
    "id": "mastah",
    "type": "Research",
    "title": "MASTAH: Minimum Auction Spanning Task Assignment Hierarchy",
    "summary": "FJSP scheduling metaheuristic that uses a hierarchy of simulated decision nodes and local auctions to steer task-machine assignments without searching the full combinatorial space.",
    "topics": [
      "multi-agent",
      "task-planning",
      "simulation"
    ],
    "meta": {
      "Role": "Primary Researcher",
      "Tools": "Python, hierarchical searches, metaheuristics",
      "Timeline": "Aug 2025 – Aug 2026",
      "Team": "MS Research",
      "Status": "Master’s capstone in progress; presentation planned for August"
    },
    "descriptions": [
      {
            "label": "Overview",
            "text": "MASTAH, or Minimum Auction Spanning Task Assignment Hierarchy, is a scheduling metaheuristic for the Flexible Job Shop Problem. In FJSP, tasks must be assigned to machines with different capabilities, speeds, and availability. For example, one machine may drill and mill a part quickly, but is far away from a task, another may only drill slowly, but is closer, and a third may be unable to fulfill a task but is required for the next task in the sequence. The goal is to assign machines to tasks in a way that minimizes total completion time."
      },
      {
            "label": "Technical Approach",
            "text": "MASTAH narrows each assignment search to candidate machines that are likely to fit the current task. It creates a hierarchy of simulated decision nodes with task and agent ownership inspired by command hierarchies. At each step, an assignment node searches within its subtree; if several machines are available, fitness and transition-expense heuristics score each candidate. If no viable machine is available locally, the request escalates to a managing node and expands the search over a larger subtree."
      },
      {
            "label": "Outcome",
            "text": "This is ongoing master’s capstone work planned to be presented August 7th. The central hypothesis is that a well-designed hierarchy can steer assignments toward strong machines while reducing the size of each search. Poorly constructed hierarchies can add overhead, but hierarchies that group tasks sharing similar machine pools can reduce search size while keeping good candidates nearby."
      }
],
    "tags": [
      "Multi-Robot Systems",
      "FJSP",
      "Task Allocation",
      "Auctions",
      "Metaheuristics",
      "Scheduling"
    ],
    "featuredMedia": {
      "type": "video",
      "src": "assets/videos/mastah_hybrid.mp4",
      "poster": "assets/images/mastah_hybrid_poster.jpg",
      "fallback": "assets/images/mastah_hybrid_poster.jpg",
      "caption": "MASTAH scheduling with a location and capability hierarchy",
      "alt": "MASTAH scheduling visualization using a location and capability based hierarchy"
    },
    "media": [
      {
        "type": "video",
        "src": "assets/videos/mastah_hybrid.mp4",
        "poster": "assets/images/mastah_hybrid_poster.jpg",
        "fallback": "assets/images/mastah_hybrid_poster.jpg",
        "caption": "Location and capability hierarchy",
        "alt": "MASTAH scheduling a ten-machine, one-hundred-task scenario with a hierarchy based on location and capability",
        "blurb": "MASTAH scheduling a 10-machine, 100-task scenario with a hierarchy based on location and capability."
      },
      {
        "type": "video",
        "src": "assets/videos/mastah_deep.mp4",
        "poster": "assets/images/mastah_deep_poster.jpg",
        "fallback": "assets/images/mastah_deep_poster.jpg",
        "caption": "Location and shared-capability bucket hierarchy",
        "alt": "MASTAH scheduling a ten-machine, one-hundred-task scenario with a hierarchy based on task location and shared machine capability buckets",
        "blurb": "MASTAH scheduling a 10-machine, 100-task scenario with a hierarchy based on task location and shared machine capability buckets."
      },
      {
        "type": "image",
        "src": "assets/images/mastah_runtime_by_difficulty.png",
        "fallback": "assets/images/mastah_runtime_by_difficulty.png",
        "caption": "Runtime by scenario difficulty",
        "alt": "Preliminary MASTAH runtime in relation to scenario difficulty across hierarchy types and MILP FJSP formulation",
        "blurb": "Preliminary MASTAH runtime in relation to scenario difficulty across various hierarchy types and the MILP FJSP formulation."
      }
    ]
  },
  // Task and Motion Planning for Special Structures on a Franka Panda
  tampPanda: {
    "id": "tamp-panda",
    "type": "Project",
    "title": "Task and Motion Planning for Special Structures on a Franka Panda",
    "summary": "Task-and-motion-planning pipeline that grounds simulated block scenes into objects and predicates, decomposes goals with Fast Downward, and converts actions into BIT* joint-space plans with gradient-based end-effector correction.",
    "topics": [
      "task-planning",
      "simulation"
    ],
    "meta": {
      "Role": "Developer",
      "Tools": "Python, PDDL, Fast Downward, OMPL BIT*, Genesis, Franka Panda, gradient descent correction",
      "Timeline": "Oct 2025 – Dec 2025",
      "Team": "2-person project",
      "Status": "Simulation demo"
    },
    "descriptions": [
      {
            "label": "Overview",
            "text": "This system is a modular task-and-motion-planning pipeline for structure assembly tasks in the Genesis simulator using a Franka Emika Panda arm. "
      },
      {
            "label": "Technical Approach",
            "text": "The simulator state is translated into a PDDL problem by approximating the system state by comparing object locations and generating a list of relative predicates. Fast Downward is used to generated a symbolic action sequence from the current world state to the desired goal, and each action is decomposed into manipulation primitives to be executed by the arm. Continuous motions are planned with OMPL BIT*, providing fast sampling-based planning in the Panda’s joint space. Gradient descent correction is applied near the final pose to reduce end-effector position error before release, enabling sub-millimeter precision for block placement."
      },
      {
            "label": "Outcome",
            "text": "The pipeline supports longer-term planning across a range of simulated manipulation scenarios. Fast Downward provides high-level task decomposition, BIT* enables efficient motion planning, and gradient-based correction improves final placement accuracy. When disturbances change the scene, the system can update its symbolic state and replan from the new configuration."
      }
],
    "tags": [
      "TAMP",
      "PDDL",
      "Fast Downward",
      "OMPL",
      "BIT*",
      "Franka Panda",
      "Genesis",
      "Gradient Descent"
    ],
    "featuredMedia": {
      "type": "video",
      "src": "assets/videos/tamp_10_block_tower.mp4",
      "poster": "assets/images/tamp_10_block_tower_poster.jpg",
      "fallback": "assets/images/tamp_10_block_tower_poster.jpg",
      "caption": "10-block tower construction",
      "alt": "Franka Panda constructing a ten-block tower in Genesis"
    },
    "media": [
      {
        "type": "video",
        "src": "assets/videos/tamp_10_block_tower.mp4",
        "poster": "assets/images/tamp_10_block_tower_poster.jpg",
        "caption": "10-block tower construction",
        "alt": "10-block tower construction",
        "blurb": "Long-horizon stacking task in which the symbolic plan is grounded into repeated Panda pick-and-place motions to assemble a ten-block vertical tower."
      },
      {
        "type": "video",
        "src": "assets/videos/tamp_ring_structure.mp4",
        "poster": "assets/images/tamp_ring_structure_poster.jpg",
        "caption": "Special ring structure",
        "alt": "Franka Panda constructing a ring-like block structure in Genesis",
        "blurb": "Special-structure task where the planner assembles a ring-like arrangement of blocks, testing non-tower placement goals and relative block constraints."
      },
      {
        "type": "video",
        "src": "assets/videos/tamp_adjacency_task.mp4",
        "poster": "assets/images/tamp_adjacency_task_poster.jpg",
        "caption": "Adjacency task",
        "alt": "Adjacency-constrained block placement task",
        "blurb": "Adjacency-constrained arrangement task that tests relative-placement predicates rather than simple vertical stacking, requiring the planner to place blocks next to specified neighbors."
      },
      {
        "type": "video",
        "src": "assets/videos/tamp_replanning.mp4",
        "poster": "assets/images/tamp_replanning_poster.jpg",
        "caption": "Replanning disturbance recovery",
        "alt": "Replanning disturbance recovery",
        "blurb": "Replanning case where the scene state changes during execution, requiring the pipeline to update the symbolic problem and continue from the modified block arrangement."
      }
    ],
    "links": [
      {
        "label": "Report PDF",
        "href": "assets/docs/TAMP_Panda_Report.pdf",
        "type": "pdf"
      }
    ]
  },
  // Safe Navigation for Ackermann Drive Robots with Control Barrier Functions
  cbfDeepracer: {
    "id": "cbf-deepracer",
    "type": "Project",
    "title": "Safe Navigation for Ackermann Drive Robots with Control Barrier Functions",
    "summary": "ROS 2 safety-filter stack for an AWS DeepRacer that uses LiDAR-based Control Barrier Function constraints to minimally modify Nav2 velocity commands before actuation.",
    "topics": [
      "control",
      "ros-2",
      "simulation"
    ],
    "meta": {
      "Role": "Developer",
      "Tools": "ROS 2, Nav2, CBF-QP, LiDAR, SLAM, Ackermann drive",
      "Timeline": "Mar 2026 – Apr 2026",
      "Team": "3-person project",
      "Status": "Hardware and simulation demo"
    },
    "descriptions": [
      {
            "label": "Overview",
            "text": "This project utilizes control barrier functions (CBFs) to enforce collision avoidance on a controls-level on an Ackermann drive robot augmented with a LiDAR."
      },
      {
            "label": "Technical Approach",
            "text": "LiDAR scans are used to detect nearby obstacles and construct point-cloud-based barrier constraints. Nav2 computes a nominal velocity command, and a CBF-QP solves for the closest safe command that preserves planner intent while enforcing minimum-distance requirements. Perception and control run through ROS 2, with filtered commands streamed back to the physical DeepRacer for execution."
      },
      {
            "label": "Outcome",
            "text": "The final system demonstrated real-time obstacle avoidance in simulation and on physical hardware. The CBF layer modified nominal navigation commands when obstacles entered the safety region, allowing the robot to continue following the planned route while enforcing local safety constraints."
      }
],
    "tags": [
      "CBFs",
      "QP",
      "ROS 2",
      "Nav2",
      "LiDAR",
      "Ackermann Drive"
    ],
    "featuredMedia": {
      "type": "video",
      "src": "assets/videos/cbf_deepracer_demo.mp4",
      "poster": "assets/images/cbf_deepracer_model.jpg",
      "fallback": "assets/images/cbf_deepracer_model.jpg",
      "caption": "Safe Navigation for Ackermann Drive Robots with Control Barrier Functions",
      "alt": "DeepRacer CBF demo"
    },
    "media": [
      {
        "type": "video",
        "src": "assets/videos/cbf_deepracer_demo.mp4",
        "poster": "assets/images/cbf_deepracer_model.jpg",
        "caption": "Real DeepRacer demo",
        "alt": "Real DeepRacer demo"
      },
      {
        "type": "video",
        "src": "assets/videos/cbf_screencast.mp4",
        "poster": "assets/images/cbf_lidar_map.jpg",
        "caption": "Simulation screencast",
        "alt": "Simulation screencast"
      },
      {
        "type": "image",
        "src": "assets/images/cbf_system_diagram.jpg",
        "fallback": "assets/images/cbf_system_diagram.jpg",
        "caption": "ROS 2 CBF safety-filter architecture",
        "alt": "ROS 2 architecture diagram for the DeepRacer CBF safety-filter stack",
        "blurb": "ROS 2 control-flow diagram showing how perception, SLAM/Nav2, and the CBF safety filter sit between the nominal planner and the DeepRacer command interface."
      },
      {
        "type": "image",
        "src": "assets/images/cbf_lidar_map.jpg",
        "fallback": "assets/images/cbf_lidar_map.jpg",
        "caption": "LiDAR obstacle map",
        "alt": "LiDAR-derived obstacle map used by the point-cloud CBF",
        "blurb": "LiDAR-derived obstacle map used by the point-cloud CBF to enforce local distance constraints around the vehicle."
      }
    ],
    "links": [
      {
        "label": "Report PDF",
        "href": "assets/docs/CBF_DeepRacer_Report.pdf",
        "type": "pdf"
      }
    ]
  },
  // Belief-Space Control Simulation Infrastructure for DeepRacer Experiments
  beliefSpaceDeepracer: {
    "id": "deepracer-belief",
    "type": "Project",
    "title": "ML Lane-Localization and Simulation Infrastructure for DeepRacer Experiments",
    "summary": "Machine-learning lane-localization pipeline, synthetic dataset generator, and ROS 2/Isaac Sim control stack for testing belief-space safety controllers under state-dependent measurement noise.",
    "topics": [
      "control",
      "simulation",
      "machine-learning"
    ],
    "meta": {
      "Role": "Research apprentice / ML dataset, simulation, and controls infrastructure developer",
      "Tools": "Blender, Isaac Sim, PyTorch, ROS 2, AWS DeepRacer",
      "Timeline": "May 2025 – Aug 2025",
      "Team": "Automata Lab research apprenticeship",
      "Status": "Follow-on research infrastructure"
    },
"descriptions": [
  {
    "label": "Overview",
    "text": "This project built a simulation and machine-learning pipeline for testing belief-space safety controllers on an AWS DeepRacer. It combines a model trained to predict lane position from dataset generated in Blender and simulation in Isaac Sim using ROS 2 to create a repeatable lane-keeping environment with controlled perception uncertainty."
  },
  {
    "label": "Technical Approach",
    "text": "A virtual scene was designed in Blender and to be exported and meshed in Isaac Sim. The scene was designed to match the physical lab environment that hardware tests would be performed in. A virtual rendering pipeline generated camera images across configurable lane positions and heading angles to train a model. The training distribution was intentionally biased toward center-lane poses, creating a perception model that performs best near the lane center and exhibits higher, but predictable, uncertainty near lane boundaries. A ROS2-Isaac Sim pipeline was implemented to render an image taken by a simulated AWS Deepracer in the virtual lab, generate a prediction from the lane model, feed the prediction into a controller, and then execute command velocities back on the Deepracer. This pipeline can also perform the same tasks on real hardware."
  },
  {
    "label": "Outcome",
    "text": "The pipeline was used to test lane-localization and control on a physical AWS DeepRacer in the lab, while also producing simulation results in a matched Isaac Sim environment. These results establish a practical baseline for evaluating how perception uncertainty affects lane-keeping behavior and will support future work on belief-space safety controllers."
  }
],
    "tags": [
      "Machine Learning",
      "DeepRacer",
      "Belief-Space Control",
      "BCBF",
      "State-Dependent Measurement Noise",
      "Blender",
      "Isaac Sim",
      "ROS 2",
      "Simulation"
    ],
    "featuredMedia": {
      "type": "video",
      "src": "assets/videos/deepracer_lab.mp4",
      "poster": "assets/images/deepracer_screenshot_1.jpg",
      "fallback": "assets/images/deepracer_screenshot_1.jpg",
      "caption": "DeepRacer in Isaac Sim Lab environment",
      "alt": "DeepRacer lab and Blender simulation"
    },
    "media": [
      {
        "type": "video",
        "src": "assets/videos/deepracer_lab.mp4",
        "poster": "assets/images/deepracer_screenshot_1.jpg",
        "caption": "DeepRacer in Isaac Sim Lab environment",
        "alt": "DeepRacer in Isaac Sim Lab environment"
      },
      {
        "type": "video",
        "src": "assets/videos/deepracer_blender.mp4",
        "poster": "assets/images/deepracer_screenshot_2.jpg",
        "caption": "Automatic scene creation in Blender",
        "alt": "Automatic scene creation in Blender"
      },
      {
        "type": "image",
        "src": "assets/images/deepracer_screenshot_1.jpg",
        "fallback": "assets/images/deepracer_screenshot_1.jpg",
        "caption": "Blender Geometry Nodes",
        "alt": "DeepRacer simulation screenshot"
      },
      {
        "type": "image",
        "src": "assets/images/deepracer_screenshot_2.jpg",
        "fallback": "assets/images/deepracer_screenshot_2.jpg",
        "caption": "Isaac Sim ROS nodes",
        "alt": "DeepRacer environment screenshot"
      }
    ]
  },
  // Forward/Inverse Kinematics and Recursive Newton-Euler Dynamics Pipeline
  rnePipeline: {
    "id": "rne-ur5",
    "type": "Project",
    "title": "Forward/Inverse Kinematics and Recursive Newton-Euler Dynamics Pipeline",
    "summary": "Ground-up MATLAB robotics pipeline for screw-theory FK/IK, singularity-aware trajectory generation, and Recursive Newton-Euler inverse dynamics with variable end-effector loading.",
    "topics": [
      "control",
      "dynamics",
      "simulation"
    ],
    "meta": {
      "Role": "Developer",
      "Tools": "MATLAB, screw theory, numerical IK, RNEA, trajectory optimization",
      "Timeline": "Jan 2025 – May 2025",
      "Team": "Individual project",
      "Status": "Dynamics analysis"
    },
    "descriptions": [
{
  "label": "Overview",
  "text": "This project is a MATLAB robotics pipeline for modeling, planning, and analyzing serial manipulator motion. It was built to connect Cartesian goals, joint-space trajectories, and torque-level dynamics in a single workflow, with the core kinematics and dynamics math implemented from the ground up."
},
{
  "label": "Technical Approach",
  "text": "The forward kinematics, inverse kinematics, Jacobian calculations, trajectory generation, and inverse dynamics were implemented directly in MATLAB rather than relying on robotics toolboxes for the underlying math. The kinematics workflow uses screw-axis representations, product-of-exponentials forward kinematics, and numerical inverse kinematics to convert desired end-effector poses into joint configurations. Quintic polynomials generate smooth joint-space trajectories with continuous position, velocity, and acceleration profiles, while a custom Recursive Newton-Euler implementation computes joint torques under inertial, gravitational, and external loading effects. External libraries were used only for robot visualization and animation."
},
{
  "label": "Outcome",
  "text": "The pipeline was tested on simulated UR5 trajectories and loading cases, including motions with external end-effector forces. It can generate joint-space motion from Cartesian goals, animate the resulting robot movement, and compute torque profiles for evaluating whether a planned trajectory is physically reasonable. The project demonstrates a ground-up implementation of the mathematical foundation behind FK, IK, trajectory generation, and inverse dynamics, with visualization tools used only to display the resulting motion."
}
],
    "tags": [
      "MATLAB",
      "RNEA",
      "UR5",
      "Screw Theory",
      "Inverse Dynamics",
      "IK"
    ],
    "featuredMedia": {
      "type": "video",
      "src": "assets/videos/rne_smiley_full_hd.mp4",
      "poster": "assets/images/rne_torque_plot.jpg",
      "fallback": "assets/images/rne_torque_plot.jpg",
      "caption": "UR5 trajectory in space",
      "alt": "UR5 trajectory in space"
    },
    "media": [
      {
        "type": "video",
        "src": "assets/videos/rne_smiley_full_hd.mp4",
        "poster": "assets/images/rne_torque_plot.jpg",
        "caption": "UR5 trajectory in space",
        "alt": "UR5 trajectory in space"
      },
      {
        "type": "image",
        "src": "assets/images/rne_torque_plot.jpg",
        "fallback": "assets/images/rne_torque_plot.jpg",
        "caption": "Joint torque with 2 kg EE load",
        "alt": "UR5 joint torque plot with a 2 kg end-effector load",
        "blurb": "Computed joint torque history for the UR5 trajectory with a 2 kg end-effector load, produced by the Recursive Newton-Euler inverse-dynamics implementation."
      }
    ]
  },
  // Quadrotor UAV Intercept Controller
  quadrotorUav: {
    "id": "quadrotor-uav",
    "type": "Project",
    "title": "Quadrotor UAV Intercept Controller",
    "summary": "MATLAB optimal-control simulation for intercepting a moving UAV using a 12-state quadrotor model, rotor thrust limits, and repeated scenario validation.",
    "topics": [
      "control",
      "dynamics",
      "simulation"
    ],
    "meta": {
      "Role": "Developer",
      "Tools": "MATLAB, LQR, optimal control, nonlinear simulation",
      "Timeline": "Aug 2024 – Dec 2024",
      "Team": "Individual project",
      "Status": "Controller simulation"
    },
    "descriptions": [
      {
            "label": "Overview",
            "text": "This MATLAB simulation models a quadrotor assigned to monitor restricted airspace, intercept an unidentified UAV, and return to its origin after capture. The controller must handle a moving target with an initially unknown trajectory while respecting rotor thrust limits and bounded flight-volume constraints."
      },
      {
            "label": "Technical Approach",
            "text": "The simulator represents the quadrotor with 12 states for position, orientation, linear velocity, and angular velocity. Rotor thrust is applied through the body frame, and propeller torque effects are included in the control model. A linearized representation supports feedback design, while the simulation retains nonlinear coupling between thrust, attitude, moments, and translation."
      },
      {
            "label": "Outcome",
            "text": "The controller consistently intercepted moving targets within 0.1 m at speeds up to 4.8 m/s while respecting the 3 N per-rotor thrust limit. The individual scenario videos show repeatability across different target motions and initial conditions. The project demonstrates feedback-control design, dynamic simulation, and performance validation for a constrained aerial pursuit task."
      }
],
    "tags": [
      "MATLAB",
      "Quadrotor",
      "LQR",
      "Sliding Mode Control",
      "Simulation",
      "UAV Pursuit"
    ],
    "featuredMedia": {
      "type": "video",
      "src": "assets/videos/quadrotor_p1.mp4",
      "caption": "Intercept test case 1",
      "alt": "Intercept test case 1"
    },
    "media": [
      {
        "type": "video",
        "src": "assets/videos/quadrotor_p1.mp4",
        "caption": "Intercept test case 1",
        "alt": "Intercept test case 1"
      },
      {
        "type": "video",
        "src": "assets/videos/quadrotor_p2.mp4",
        "caption": "Intercept test case 2",
        "alt": "Intercept test case 2"
      },
      {
        "type": "video",
        "src": "assets/videos/quadrotor_p3.mp4",
        "caption": "Intercept test case 3",
        "alt": "Intercept test case 3"
      }
    ]
  }
};

// Exposed for browser-console debugging and for optional custom scripts.
window.ENTRY_LIBRARY = ENTRY_LIBRARY;

window.PORTFOLIO_DATA = {
  "profile": {
    "name": "Benjamin Cruse",
    "subtitle": "BS Robotics and Automation Engineering, WPI; MS expected August 2026",
    "avatar": "assets/images/profile.jpg",
    "github": "https://github.com/TheBoopleBeep",
    "linkedin": "https://www.linkedin.com/in/benjamindcruse/",
    "emails": [
      "bdcruse@wpi.edu",
      "benjamindcruse@gmail.com"
    ],
    "phone": "409-789-0687",
    "location": "Greater Boston, MA / WPI",
    "resume": "assets/docs/Benjamin_Cruse_Resume.pdf",
    "sidebarNote": "Robotics and Automation Engineering BS graduate completing an MS at WPI in August 2026. Focused on robotics software, autonomy, controls, motion planning, simulation, and research engineering.",
    "contactIntro": "If you have any questions about my work or would like to speak to me about any project or job positions, please reach out to me. I am currently based in the Greater Boston Area, but would be more than willing to relocate for the right opportunity. I will usually respond within two days, unless I am hiking in the middle of nowhere. I look forward to hearing from you!",
    "heroActions": [
      {
        "label": "Research",
        "href": "#research"
      },
      {
        "label": "Projects",
        "href": "#projects"
      },
      {
        "label": "Contact",
        "href": "#contact"
      },
      {
        "label": "Resume",
        "href": "#resume"
      }
    ],
    "roleTarget": "Focused on robotics software, autonomy, controls, motion planning, simulation, and safety-critical robotic systems."
  },
  "skills": [
    "Robot Control",
    "MPC",
    "CLFs/CBFs",
    "Dynamics",
    "Forward and Inverse Kinematics",
    "SLAM",
    "MCL",
    "MDPs/POMDPs",
    "LTL/STL",
    "Automata Theory",
    "Task Planning",
    "Embedded Systems",
    "Multi-Agent Systems",
    "Localization",
    "Inverse Dynamics",
    "Sensors & Actuators",
    "3D Modelling",
    "Physics and Controller Simulation",
    "Optimal Control",
    "Motion Planning",
    "PDDL",
    "OMPL",
    "Camera Calibration",
    "Automatic Data Labeling",
    "OpenCV",
    "PyTorch",
    "CNNs",
    "Transformers",
    "Blender",
    "Isaac Sim",
    "RViz2",
    "Gazebo",
    "MATLAB",
    "Python",
    "C++",
    "ROS & ROS 2",
    "Docker",
    "Sensor Fusion",
    "EKF/UKF",
    "Nav2",
    "CMake",
    "Trajectory Optimization"
  ],
  "navigation": [
    {
      "label": "About",
      "href": "#about"
    },
    {
      "label": "Research",
      "href": "#research"
    },
    {
      "label": "Projects",
      "href": "#projects"
    },
    {
      "label": "Contact",
      "href": "#contact"
    },
    {
      "label": "Resume",
      "href": "#resume"
    }
  ],
  "about": {
    "paragraph": "I am a Robotics and Automation Engineering BS graduate at WPI completing an MS in August 2026. My work focuses on the intersection of planning, controls, formal methods, simulation, and physical robot execution, including LTL-aware planning, control barrier functions, multi-agent task allocation, inverse dynamics, simulation pipelines, and hardware testing.",
    "items": [
      {
        "title": "Focus",
        "text": "Task planning, safety-critical control, dynamics, multi-agent systems, perception pipelines, and simulation-to-robot workflows."
      },
      {
        "title": "Strengths",
        "text": "Connecting formal algorithms, math, and logic to implementation: robot models, constraints, sensing assumptions, and real-time execution."
      },
      {
        "title": "Tooling",
        "text": "Python, MATLAB, C++, ROS 2, OMPL, PDDL, Nav2, PyTorch, Blender, Isaac Sim, Genesis, Docker, and Gazebo."
      }
    ]
  },
  "sections": [
    {
      "id": "research",
      "title": "Research",
      "filters": [
        {
          "label": "All",
          "value": "all"
        },
        {
          "label": "Formal Methods",
          "value": "formal-methods"
        },
        {
          "label": "Task Planning",
          "value": "task-planning"
        },
        {
          "label": "Simulation",
          "value": "simulation"
        },
        {
          "label": "ROS 2",
          "value": "ros-2"
        },
        {
          "label": "Multi-Agent",
          "value": "multi-agent"
        },
        {
          "label": "Machine Learning",
          "value": "machine-learning"
        }
      ],
      "entries": [
        // Add/remove/reorder this section by changing one ENTRY_LIBRARY line.
        ENTRY_LIBRARY.thinkAgain,
        ENTRY_LIBRARY.mastah,
      ]
    },
    {
      "id": "projects",
      "title": "Projects",
      "filters": [
        {
          "label": "All",
          "value": "all"
        },
        {
          "label": "Task Planning",
          "value": "task-planning"
        },
        {
          "label": "Control",
          "value": "control"
        },
        {
          "label": "Simulation",
          "value": "simulation"
        },
        {
          "label": "ROS 2",
          "value": "ros-2"
        },
        {
          "label": "Dynamics",
          "value": "dynamics"
        },
        {
          "label": "Machine Learning",
          "value": "machine-learning"
        }
      ],
      "entries": [
        // Add/remove/reorder this section by changing one ENTRY_LIBRARY line.
        ENTRY_LIBRARY.tampPanda,
        ENTRY_LIBRARY.cbfDeepracer,
        ENTRY_LIBRARY.beliefSpaceDeepracer,
        ENTRY_LIBRARY.rnePipeline,
        ENTRY_LIBRARY.quadrotorUav,
      ]
    }
  ]
};
