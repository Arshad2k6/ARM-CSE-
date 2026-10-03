/**
 * TG/TS ECET 2026 CSE Syllabus Inventory
 * Official Source: Telangana State Council of Higher Education (TGCHE) / SBTET Telangana
 */

export interface TopicItem {
  id: string;
  topicNumber: number;
  officialTopicName: string;
  logicalTopicName: string;
  subjectId: string;
  subjectName: string;
  syllabusDescription: string;
  weightageEstimate: string;
}

export interface SubjectItem {
  id: string;
  subjectCode: string;
  name: string;
  officialMarks: number;
  units: {
    unitNumber: number;
    unitTitle: string;
    topics: string[];
  }[];
  topicIds: string[];
}

export const CSE_SUBJECTS: SubjectItem[] = [
  {
    id: "DE",
    subjectCode: "CSE-DE",
    name: "Digital Electronics",
    officialMarks: 8,
    units: [
      {
        unitNumber: 1,
        unitTitle: "Number Systems and Logic Gates",
        topics: [
          "Binary, Octal, Decimal, and Hexadecimal Number Systems and Base Conversions",
          "Logic Gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) and Boolean Algebra Theorems"
        ]
      },
      {
        unitNumber: 2,
        unitTitle: "Simplification and Combinational Logic",
        topics: [
          "Karnaugh Maps (K-maps) 2, 3, 4 Variable Simplification",
          "Combinational Circuits: Adders, Subtractors, Encoders, Decoders, Multiplexers, Demultiplexers"
        ]
      },
      {
        unitNumber: 3,
        unitTitle: "Sequential Logic and Memories",
        topics: [
          "Latches and Flip-Flops (SR, JK, D, T), Counters and Shift Registers",
          "Semiconductor Memories (RAM, ROM, PROM, EPROM, EEPROM, Flash Memory)"
        ]
      }
    ],
    topicIds: ["CSE-T01", "CSE-T02", "CSE-T03", "CSE-T04", "CSE-T05", "CSE-T06"]
  },
  {
    id: "MP",
    subjectCode: "CSE-MP",
    name: "Microprocessors",
    officialMarks: 10,
    units: [
      {
        unitNumber: 1,
        unitTitle: "8086 Architecture and Register Organization",
        topics: [
          "8086 Microprocessor Architecture, BIU, EU, and Memory Segmentation",
          "8086 Register Organization, Flag Register, and Pointers"
        ]
      },
      {
        unitNumber: 2,
        unitTitle: "8086 Instruction Set and Programming",
        topics: [
          "8086 Addressing Modes and Complete Instruction Set",
          "Interrupt Handling, Interrupt Vector Table (IVT), and Assembly Language Programming"
        ]
      },
      {
        unitNumber: 3,
        unitTitle: "Peripherals and Advanced Processors",
        topics: [
          "Peripheral Interfacing: 8255 PPI, 8257 DMA, 8251A USART, 8279 Keyboard/Display",
          "Preliminary Features of Intel 80286 and 80386 Microprocessors"
        ]
      }
    ],
    topicIds: ["CSE-T07", "CSE-T08", "CSE-T09", "CSE-T10", "CSE-T11", "CSE-T12"]
  },
  {
    id: "CO",
    subjectCode: "CSE-CO",
    name: "Computer Organization",
    officialMarks: 8,
    units: [
      {
        unitNumber: 1,
        unitTitle: "CPU Organization and Instruction Execution",
        topics: [
          "CPU Functional Blocks, Stored Program Concept, and Instruction Execution Cycle",
          "Fixed-Point and Floating-Point (IEEE 754) Representation and Computer Arithmetic"
        ]
      },
      {
        unitNumber: 2,
        unitTitle: "Memory Hierarchy and I/O Organization",
        topics: [
          "Memory Hierarchy, Cache Memory Mapping Techniques, and Virtual Memory",
          "I/O Organization, Programmed I/O, Interrupts, and Direct Memory Access (DMA)"
        ]
      },
      {
        unitNumber: 3,
        unitTitle: "Pipelining",
        topics: [
          "Instruction Pipelining, Hazards, and Parallel Processing Concepts"
        ]
      }
    ],
    topicIds: ["CSE-T13", "CSE-T14", "CSE-T15", "CSE-T16", "CSE-T17"]
  },
  {
    id: "CPDS",
    subjectCode: "CSE-CPDS",
    name: "C Programming & Data Structures",
    officialMarks: 16,
    units: [
      {
        unitNumber: 1,
        unitTitle: "C Programming Basics and Control",
        topics: [
          "C Data Types, Operators, Expressions, and Control Flow Statements",
          "Functions, Recursion, Parameter Passing, and Storage Classes"
        ]
      },
      {
        unitNumber: 2,
        unitTitle: "Pointers, Structures, and File I/O",
        topics: [
          "Arrays, Pointers, Pointer Arithmetic, and Dynamic Memory Allocation",
          "Structures, Unions, typedef, and File Handling Functions"
        ]
      },
      {
        unitNumber: 3,
        unitTitle: "Linear Data Structures",
        topics: [
          "Stack ADT, Operations, and Applications (Infix to Postfix)",
          "Queue ADT, Operations, and Circular Queues",
          "Linked Lists: Singly, Doubly, and Circular Linked Lists"
        ]
      },
      {
        unitNumber: 4,
        unitTitle: "Non-Linear Structures and Algorithms",
        topics: [
          "Binary Trees, Binary Search Trees, and Tree Traversals (Inorder, Preorder, Postorder)",
          "Searching (Linear, Binary) and Sorting Algorithms (Bubble, Selection, Insertion) with Complexity Analysis"
        ]
      }
    ],
    topicIds: ["CSE-T18", "CSE-T19", "CSE-T20", "CSE-T21", "CSE-T22", "CSE-T23", "CSE-T24", "CSE-T25", "CSE-T26"]
  },
  {
    id: "CN",
    subjectCode: "CSE-CN",
    name: "Computer Networks",
    officialMarks: 10,
    units: [
      {
        unitNumber: 1,
        unitTitle: "Network Topologies and Reference Models",
        topics: [
          "Network Topologies and Transmission Media (Guided and Unguided)",
          "OSI 7-Layer Reference Model and TCP/IP Protocol Architecture"
        ]
      },
      {
        unitNumber: 2,
        unitTitle: "Data Link and Network Layers",
        topics: [
          "Data Link Layer: Framing, Flow Control, and Error Control (CRC, Hamming Codes)",
          "Network Layer: IPv4 Addressing, Classes, Subnetting, CIDR, and Routing Protocols"
        ]
      },
      {
        unitNumber: 3,
        unitTitle: "Transport and Application Layers",
        topics: [
          "Transport Layer: TCP vs UDP, Three-Way Handshake, Flow Control, and Congestion Control",
          "Application Layer Protocols (DNS, HTTP, HTTPS, FTP, SMTP) and Network Security"
        ]
      }
    ],
    topicIds: ["CSE-T27", "CSE-T28", "CSE-T29", "CSE-T30", "CSE-T31", "CSE-T32"]
  },
  {
    id: "OS",
    subjectCode: "CSE-OS",
    name: "Operating Systems",
    officialMarks: 12,
    units: [
      {
        unitNumber: 1,
        unitTitle: "OS Fundamentals and Process Scheduling",
        topics: [
          "Operating System Functions, Architecture, System Calls, and Dual-Mode Operation",
          "Process States, Process Control Block (PCB), and CPU Scheduling Algorithms (FCFS, SJF, RR)"
        ]
      },
      {
        unitNumber: 2,
        unitTitle: "Synchronization and Deadlocks",
        topics: [
          "Process Synchronization, Critical Section Problem, Semaphores, and Classical Problems",
          "Deadlock Characterization, Prevention, Avoidance (Banker's Algorithm), and Detection"
        ]
      },
      {
        unitNumber: 3,
        unitTitle: "Memory and Storage Management",
        topics: [
          "Memory Management, Paging, Segmentation, Virtual Memory, and Page Replacement Algorithms",
          "File System Implementation, Directory Structures, and Disk Scheduling Algorithms"
        ]
      }
    ],
    topicIds: ["CSE-T33", "CSE-T34", "CSE-T35", "CSE-T36", "CSE-T37", "CSE-T38"]
  },
  {
    id: "DB",
    subjectCode: "CSE-DB",
    name: "RDBMS",
    officialMarks: 14,
    units: [
      {
        unitNumber: 1,
        unitTitle: "Database Concepts and Data Models",
        topics: [
          "Database Architecture, 3-Schema Architecture, Data Independence, and ER Modeling",
          "Relational Model, Integrity Constraints, Relational Algebra, and E.F. Codd's 12 Rules"
        ]
      },
      {
        unitNumber: 2,
        unitTitle: "SQL and Normalization",
        topics: [
          "SQL Commands (DDL, DML, DCL, TCL), Aggregate Functions, Joins, Subqueries, and Views",
          "Functional Dependencies and Database Normalization (1NF, 2NF, 3NF, BCNF)"
        ]
      },
      {
        unitNumber: 3,
        unitTitle: "Transactions and PL/SQL",
        topics: [
          "Transactions, ACID Properties, Serializability, and Concurrency Control (2PL)",
          "PL/SQL Programming: Block Structure, Cursors, Triggers, Procedures, and Functions"
        ]
      }
    ],
    topicIds: ["CSE-T39", "CSE-T40", "CSE-T41", "CSE-T42", "CSE-T43", "CSE-T44"]
  },
  {
    id: "CPP",
    subjectCode: "CSE-CPP",
    name: "OOP Through C++",
    officialMarks: 10,
    units: [
      {
        unitNumber: 1,
        unitTitle: "Classes, Objects, and Constructors",
        topics: [
          "Object-Oriented Programming Paradigms, Classes, and Objects in C++",
          "Constructors, Destructors, and Dynamic Memory Allocation (new, delete)"
        ]
      },
      {
        unitNumber: 2,
        unitTitle: "Overloading and Inheritance",
        topics: [
          "Function Overloading and Operator Overloading (Unary and Binary)",
          "Inheritance Modes, Types of Inheritance, and Virtual Base Classes"
        ]
      },
      {
        unitNumber: 3,
        unitTitle: "Polymorphism and Advanced C++",
        topics: [
          "Virtual Functions, Pure Virtual Functions, Abstract Classes, and Friend Functions",
          "C++ Templates, Exception Handling (try, catch, throw), and Stream I/O Operations"
        ]
      }
    ],
    topicIds: ["CSE-T45", "CSE-T46", "CSE-T47", "CSE-T48", "CSE-T49", "CSE-T50"]
  },
  {
    id: "JAVA",
    subjectCode: "CSE-JAVA",
    name: "Java Programming",
    officialMarks: 10,
    units: [
      {
        unitNumber: 1,
        unitTitle: "Java Fundamentals and OOP",
        topics: [
          "Java Architecture, Bytecode, JVM, Data Types, Control Structures, and Arrays",
          "Classes, Objects, Methods, Constructors, and Inheritance in Java"
        ]
      },
      {
        unitNumber: 2,
        unitTitle: "Interfaces, Packages, and Exceptions",
        topics: [
          "Interfaces, Multiple Inheritance via Interfaces, Packages, and Access Protection",
          "Exception Handling (try, catch, finally, throw, throws) and Built-in Exceptions"
        ]
      },
      {
        unitNumber: 3,
        unitTitle: "Threads and Database Connectivity",
        topics: [
          "Multithreading, Thread Lifecycle, Runnable Interface, and Thread Synchronization",
          "Java Database Connectivity (JDBC) Architecture, Drivers, and Database Operations"
        ]
      }
    ],
    topicIds: ["CSE-T51", "CSE-T52", "CSE-T53", "CSE-T54", "CSE-T55", "CSE-T56"]
  },
  {
    id: "WEB",
    subjectCode: "CSE-WEB",
    name: "Internet Programming (Web Technologies)",
    officialMarks: 10,
    units: [
      {
        unitNumber: 1,
        unitTitle: "HTML and CSS Fundamentals",
        topics: [
          "HTML Document Structure, Headings, Text Formatting, Tables, Forms, and Elements",
          "CSS Selectors, Box Model, Colors, Styling, and Responsive Layout Fundamentals"
        ]
      },
      {
        unitNumber: 2,
        unitTitle: "Client-Side Scripting with JavaScript",
        topics: [
          "JavaScript Syntax, Variables, Data Types, Control Structures, and Functions",
          "DOM Manipulation, Event Handling, and Client-Side Form Validation"
        ]
      },
      {
        unitNumber: 3,
        unitTitle: "Server-Side Scripting with PHP",
        topics: [
          "PHP Syntax, Variables, Control Structures, Arrays, and Superglobals",
          "PHP Database Connectivity (MySQL/PDO), Cookies, and Session Management"
        ]
      }
    ],
    topicIds: ["CSE-T57", "CSE-T58", "CSE-T59", "CSE-T60", "CSE-T61", "CSE-T62"]
  }
];

export const CSE_TOPICS: TopicItem[] = [
  // Subject 1: Digital Electronics (6 topics)
  {
    id: "CSE-T01",
    topicNumber: 1,
    officialTopicName: "Number systems and codes",
    logicalTopicName: "Number Systems and Base Conversions",
    subjectId: "DE",
    subjectName: "Digital Electronics",
    syllabusDescription: "Binary, octal, decimal, and hexadecimal number systems; base conversion algorithms; BCD, Gray code, and Excess-3 codes.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T02",
    topicNumber: 2,
    officialTopicName: "Logic gates and Boolean algebra",
    logicalTopicName: "Logic Gates and Boolean Algebra",
    subjectId: "DE",
    subjectName: "Digital Electronics",
    syllabusDescription: "Basic gates (AND, OR, NOT), universal gates (NAND, NOR), special gates (XOR, XNOR), Boolean algebra laws, and De Morgan's theorems.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T03",
    topicNumber: 3,
    officialTopicName: "Boolean function simplification",
    logicalTopicName: "Karnaugh Maps and Function Simplification",
    subjectId: "DE",
    subjectName: "Digital Electronics",
    syllabusDescription: "Sum of Products (SOP), Product of Sums (POS), canonical forms, 2, 3, and 4 variable K-map minimization, and don't-care conditions.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T04",
    topicNumber: 4,
    officialTopicName: "Combinational circuits",
    logicalTopicName: "Combinational Logic Circuits",
    subjectId: "DE",
    subjectName: "Digital Electronics",
    syllabusDescription: "Half adder, full adder, half subtractor, full subtractor, binary parallel adder, encoders, decoders, multiplexers, and demultiplexers.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T05",
    topicNumber: 5,
    officialTopicName: "Sequential circuits",
    logicalTopicName: "Sequential Circuits and Flip-Flops",
    subjectId: "DE",
    subjectName: "Digital Electronics",
    syllabusDescription: "Latches, SR, JK, D, and T flip-flops; edge and level triggering; master-slave JK flip-flops; synchronous and asynchronous counters; shift registers.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T06",
    topicNumber: 6,
    officialTopicName: "Semiconductor memories",
    logicalTopicName: "Semiconductor Memories",
    subjectId: "DE",
    subjectName: "Digital Electronics",
    syllabusDescription: "RAM (SRAM, DRAM), ROM, PROM, EPROM, EEPROM, Flash memory classification, internal organization, and memory expansion.",
    weightageEstimate: "1 Question"
  },

  // Subject 2: Microprocessors (6 topics)
  {
    id: "CSE-T07",
    topicNumber: 7,
    officialTopicName: "8086 microprocessor architecture",
    logicalTopicName: "8086 Architecture and Memory Segmentation",
    subjectId: "MP",
    subjectName: "Microprocessors",
    syllabusDescription: "Internal architecture of 8086, Bus Interface Unit (BIU), Execution Unit (EU), 20-bit address generation, and memory segmentation (CS, DS, SS, ES).",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T08",
    topicNumber: 8,
    officialTopicName: "Register organization of 8086",
    logicalTopicName: "8086 Register Organization and Flags",
    subjectId: "MP",
    subjectName: "Microprocessors",
    syllabusDescription: "General purpose registers (AX, BX, CX, DX), pointer and index registers (SP, BP, SI, DI), instruction pointer (IP), and flag register (status and control flags).",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T09",
    topicNumber: 9,
    officialTopicName: "Addressing modes and instruction set",
    logicalTopicName: "8086 Addressing Modes and Instruction Set",
    subjectId: "MP",
    subjectName: "Microprocessors",
    syllabusDescription: "Immediate, direct, register, register indirect, indexed, based, and based indexed addressing modes; data transfer, arithmetic, logical, string, and control transfer instructions.",
    weightageEstimate: "2-3 Questions"
  },
  {
    id: "CSE-T10",
    topicNumber: 10,
    officialTopicName: "Interrupts and assembly programming",
    logicalTopicName: "8086 Interrupts and Assembly Programming",
    subjectId: "MP",
    subjectName: "Microprocessors",
    syllabusDescription: "Hardware and software interrupts, Interrupt Vector Table (IVT), interrupt processing sequence, assembler directives, and modular assembly programs.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T11",
    topicNumber: 11,
    officialTopicName: "Peripheral devices and interfacing",
    logicalTopicName: "Peripheral Interfacing (8255, 8257, 8251A, 8279)",
    subjectId: "MP",
    subjectName: "Microprocessors",
    syllabusDescription: "Architecture and operating modes of INTEL 8255 PPI, 8257 DMA controller, 8251A USART, and 8279 keyboard/display controller.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T12",
    topicNumber: 12,
    officialTopicName: "Features of advanced processors",
    logicalTopicName: "Advanced Processors (80286 and 80386 Features)",
    subjectId: "MP",
    subjectName: "Microprocessors",
    syllabusDescription: "Salient architectural features of Intel 80286 and 80386, real mode, protected virtual address mode, and paging mechanism.",
    weightageEstimate: "1 Question"
  },

  // Subject 3: Computer Organization (5 topics)
  {
    id: "CSE-T13",
    topicNumber: 13,
    officialTopicName: "Functional blocks of CPU and instruction execution",
    logicalTopicName: "CPU Organization and Instruction Execution",
    subjectId: "CO",
    subjectName: "Computer Organization",
    syllabusDescription: "CPU functional blocks, register transfers, stored program computer concept, instruction cycle, fetch, decode, and execute phases.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T14",
    topicNumber: 14,
    officialTopicName: "Data representation and computer arithmetic",
    logicalTopicName: "Data Representation and Computer Arithmetic",
    subjectId: "CO",
    subjectName: "Computer Organization",
    syllabusDescription: "Fixed-point representation, signed numbers (1's and 2's complement), floating-point IEEE 754 format, and multiplication algorithms (Booth's algorithm).",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T15",
    topicNumber: 15,
    officialTopicName: "Memory hierarchy and cache memory",
    logicalTopicName: "Memory Hierarchy and Cache Memory",
    subjectId: "CO",
    subjectName: "Computer Organization",
    syllabusDescription: "Memory hierarchy, main memory, cache memory principles, direct mapping, associative mapping, set-associative mapping, hit ratio, and virtual memory.",
    weightageEstimate: "2-3 Questions"
  },
  {
    id: "CSE-T16",
    topicNumber: 16,
    officialTopicName: "Input-output organization and data transfer",
    logicalTopicName: "Input-Output Organization and DMA",
    subjectId: "CO",
    subjectName: "Computer Organization",
    syllabusDescription: "Programmed I/O, interrupt-driven I/O, Direct Memory Access (DMA) transfer modes (burst, cycle stealing), bus arbitration, and I/O channels.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T17",
    topicNumber: 17,
    officialTopicName: "Pipelining and parallel processing",
    logicalTopicName: "Instruction Pipelining and Hazards",
    subjectId: "CO",
    subjectName: "Computer Organization",
    syllabusDescription: "Instruction pipeline concept, pipeline stages, structural, data, and control hazards, speedup calculation, and basic parallel architecture concepts.",
    weightageEstimate: "1 Question"
  },

  // Subject 4: C Programming and Data Structures (9 topics)
  {
    id: "CSE-T18",
    topicNumber: 18,
    officialTopicName: "C fundamentals and control statements",
    logicalTopicName: "C Language Fundamentals and Control Flow",
    subjectId: "CPDS",
    subjectName: "C Programming & Data Structures",
    syllabusDescription: "Data types, constants, variables, operators, expressions, operator precedence, if-else, switch-case, and iteration loops (for, while, do-while).",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T19",
    topicNumber: 19,
    officialTopicName: "Functions and storage classes in C",
    logicalTopicName: "Functions, Recursion, and Storage Classes",
    subjectId: "CPDS",
    subjectName: "C Programming & Data Structures",
    syllabusDescription: "Function definition, prototypes, parameter passing (pass by value, pass by reference), recursion, and storage classes (auto, register, static, extern).",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T20",
    topicNumber: 20,
    officialTopicName: "Arrays and pointers",
    logicalTopicName: "Arrays, Pointers, and Dynamic Memory Allocation",
    subjectId: "CPDS",
    subjectName: "C Programming & Data Structures",
    syllabusDescription: "1D and 2D arrays, pointer variables, pointer arithmetic, pointers and arrays, dynamic memory functions (malloc, calloc, realloc, free).",
    weightageEstimate: "2-3 Questions"
  },
  {
    id: "CSE-T21",
    topicNumber: 21,
    officialTopicName: "Structures, unions, and file operations",
    logicalTopicName: "Structures, Unions, and File Handling",
    subjectId: "CPDS",
    subjectName: "C Programming & Data Structures",
    syllabusDescription: "Structure declaration, accessing members, arrays of structures, unions, typedef, bit fields, file pointers, fopen, fclose, fprintf, fscanf, fread, fwrite.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T22",
    topicNumber: 22,
    officialTopicName: "Stacks and applications",
    logicalTopicName: "Stack ADT and Expression Evaluation",
    subjectId: "CPDS",
    subjectName: "C Programming & Data Structures",
    syllabusDescription: "Stack Abstract Data Type, array implementation of stacks, push and pop operations, infix to postfix conversion, and postfix expression evaluation.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T23",
    topicNumber: 23,
    officialTopicName: "Queues and variants",
    logicalTopicName: "Queue ADT and Circular Queues",
    subjectId: "CPDS",
    subjectName: "C Programming & Data Structures",
    syllabusDescription: "Queue Abstract Data Type, linear queue operations, queue full and empty conditions, circular queues, priority queues, and double-ended queues (deque).",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T24",
    topicNumber: 24,
    officialTopicName: "Linked lists",
    logicalTopicName: "Linked Lists (Singly, Doubly, Circular)",
    subjectId: "CPDS",
    subjectName: "C Programming & Data Structures",
    syllabusDescription: "Singly linked list node representation, insertion, deletion, and traversal algorithms; doubly linked lists; circular linked lists.",
    weightageEstimate: "2-3 Questions"
  },
  {
    id: "CSE-T25",
    topicNumber: 25,
    officialTopicName: "Trees and tree traversals",
    logicalTopicName: "Binary Trees and Tree Traversals",
    subjectId: "CPDS",
    subjectName: "C Programming & Data Structures",
    syllabusDescription: "Binary tree terminology, properties, representation, Binary Search Tree (BST) operations, and tree traversals (inorder, preorder, postorder).",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T26",
    topicNumber: 26,
    officialTopicName: "Searching and sorting algorithms",
    logicalTopicName: "Searching and Sorting Algorithms",
    subjectId: "CPDS",
    subjectName: "C Programming & Data Structures",
    syllabusDescription: "Linear search, binary search, bubble sort, selection sort, insertion sort algorithms, time complexity (O notation), and space complexity.",
    weightageEstimate: "2 Questions"
  },

  // Subject 5: Computer Networks (6 topics)
  {
    id: "CSE-T27",
    topicNumber: 27,
    officialTopicName: "Network topologies and transmission media",
    logicalTopicName: "Network Topologies and Transmission Media",
    subjectId: "CN",
    subjectName: "Computer Networks",
    syllabusDescription: "Bus, star, ring, mesh, tree, and hybrid network topologies; guided media (twisted pair, coaxial, optical fiber) and unguided wireless media.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T28",
    topicNumber: 28,
    officialTopicName: "OSI and TCP/IP reference models",
    logicalTopicName: "OSI 7-Layer Model and TCP/IP Architecture",
    subjectId: "CN",
    subjectName: "Computer Networks",
    syllabusDescription: "7 layers of the OSI model, functions of each layer, encapsulation, and comparison between OSI and TCP/IP architectural suites.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T29",
    topicNumber: 29,
    officialTopicName: "Data link layer and error control",
    logicalTopicName: "Data Link Layer, Framing, and Error Control",
    subjectId: "CN",
    subjectName: "Computer Networks",
    syllabusDescription: "Framing methods, flow control protocols (Stop and Wait, Sliding Window), error detection (parity, checksum, CRC), and Hamming error correction code.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T30",
    topicNumber: 30,
    officialTopicName: "Network layer and IP addressing",
    logicalTopicName: "Network Layer, IPv4 Addressing, and Subnetting",
    subjectId: "CN",
    subjectName: "Computer Networks",
    syllabusDescription: "IPv4 classful addressing (Classes A, B, C, D, E), subnet masks, CIDR notation, ARP, RARP, ICMP, and routing algorithms (Distance Vector, Link State).",
    weightageEstimate: "2-3 Questions"
  },
  {
    id: "CSE-T31",
    topicNumber: 31,
    officialTopicName: "Transport layer protocols",
    logicalTopicName: "Transport Layer Protocols (TCP and UDP)",
    subjectId: "CN",
    subjectName: "Computer Networks",
    syllabusDescription: "TCP vs UDP comparison, TCP 3-way handshake, port numbers, flow control (sliding window), congestion control mechanisms, and socket concepts.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T32",
    topicNumber: 32,
    officialTopicName: "Application protocols and security",
    logicalTopicName: "Application Protocols and Network Security",
    subjectId: "CN",
    subjectName: "Computer Networks",
    syllabusDescription: "Domain Name System (DNS), HTTP/HTTPS, FTP, SMTP, POP3, IMAP protocols, basic cryptography (symmetric/asymmetric), and firewall concepts.",
    weightageEstimate: "1-2 Questions"
  },

  // Subject 6: Operating Systems (6 topics)
  {
    id: "CSE-T33",
    topicNumber: 33,
    officialTopicName: "Operating system concepts and system calls",
    logicalTopicName: "Operating System Architecture and System Calls",
    subjectId: "OS",
    subjectName: "Operating Systems",
    syllabusDescription: "OS functions, batch systems, multiprogramming, time-sharing, real-time operating systems, user mode vs kernel mode, and system call execution.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T34",
    topicNumber: 34,
    officialTopicName: "Process management and CPU scheduling",
    logicalTopicName: "Process Management and CPU Scheduling",
    subjectId: "OS",
    subjectName: "Operating Systems",
    syllabusDescription: "Process states, Process Control Block (PCB), context switching, threads, and CPU scheduling algorithms: FCFS, SJF, Priority, and Round Robin.",
    weightageEstimate: "2-3 Questions"
  },
  {
    id: "CSE-T35",
    topicNumber: 35,
    officialTopicName: "Process synchronization and inter-process communication",
    logicalTopicName: "Process Synchronization and Semaphores",
    subjectId: "OS",
    subjectName: "Operating Systems",
    syllabusDescription: "Critical section problem, mutual exclusion requirements, Peterson's solution, counting and binary semaphores, mutex, and Producer-Consumer problem.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T36",
    topicNumber: 36,
    officialTopicName: "Deadlocks",
    logicalTopicName: "Deadlock Characterization, Prevention, and Avoidance",
    subjectId: "OS",
    subjectName: "Operating Systems",
    syllabusDescription: "Four Coffman conditions for deadlock, Resource Allocation Graph (RAG), deadlock prevention strategies, avoidance using Banker's Algorithm, and detection.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T37",
    topicNumber: 37,
    officialTopicName: "Memory management and virtual memory",
    logicalTopicName: "Memory Management, Paging, and Page Replacement",
    subjectId: "OS",
    subjectName: "Operating Systems",
    syllabusDescription: "Contiguous memory allocation, internal and external fragmentation, paging, TLB, segmentation, virtual memory, demand paging, and page replacement (FIFO, LRU, Optimal).",
    weightageEstimate: "2-3 Questions"
  },
  {
    id: "CSE-T38",
    topicNumber: 38,
    officialTopicName: "File systems and disk scheduling",
    logicalTopicName: "File Systems and Disk Scheduling Algorithms",
    subjectId: "OS",
    subjectName: "Operating Systems",
    syllabusDescription: "File attributes, directory structures, contiguous, linked, and indexed file allocation, disk structure, and disk scheduling algorithms (FCFS, SSTF, SCAN, C-SCAN).",
    weightageEstimate: "1-2 Questions"
  },

  // Subject 7: RDBMS (6 topics)
  {
    id: "CSE-T39",
    topicNumber: 39,
    officialTopicName: "Database systems and E-R model",
    logicalTopicName: "Database Architecture and ER Modeling",
    subjectId: "DB",
    subjectName: "RDBMS",
    syllabusDescription: "Three-tier database schema architecture, data independence (logical and physical), Entity-Relationship (ER) model, entity types, attributes, relationships, and keys.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T40",
    topicNumber: 40,
    officialTopicName: "Relational model and Codd's rules",
    logicalTopicName: "Relational Model, Integrity Constraints, and Codd's Rules",
    subjectId: "DB",
    subjectName: "RDBMS",
    syllabusDescription: "Relational data model, relational integrity constraints (entity, referential, domain integrity), relational algebra operators, and E.F. Codd's 12 rules.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T41",
    topicNumber: 41,
    officialTopicName: "SQL commands, joins, and views",
    logicalTopicName: "SQL Queries, Constraints, Joins, and Views",
    subjectId: "DB",
    subjectName: "RDBMS",
    syllabusDescription: "DDL, DML, DCL, TCL statements; aggregate functions, GROUP BY, HAVING; Inner, Left, Right, Full Outer Joins; subqueries; views, and indexes.",
    weightageEstimate: "3 Questions"
  },
  {
    id: "CSE-T42",
    topicNumber: 42,
    officialTopicName: "Database normalization",
    logicalTopicName: "Functional Dependencies and Normalization",
    subjectId: "DB",
    subjectName: "RDBMS",
    syllabusDescription: "Data redundancy, update anomalies, functional dependencies, Armstrong axioms, First Normal Form (1NF), 2NF, 3NF, and Boyce-Codd Normal Form (BCNF).",
    weightageEstimate: "2-3 Questions"
  },
  {
    id: "CSE-T43",
    topicNumber: 43,
    officialTopicName: "Transactions and concurrency control",
    logicalTopicName: "Transactions, ACID Properties, and Concurrency Control",
    subjectId: "DB",
    subjectName: "RDBMS",
    syllabusDescription: "Transaction states, ACID properties, schedule serializability (conflict and view), concurrency anomalies (dirty read, unrepeatable read), and 2-Phase Locking (2PL).",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T44",
    topicNumber: 44,
    officialTopicName: "PL/SQL programming",
    logicalTopicName: "PL/SQL Programming (Cursors, Triggers, Procedures)",
    subjectId: "DB",
    subjectName: "RDBMS",
    syllabusDescription: "PL/SQL block structure, variables, conditional statements, loops, implicit and explicit cursors, exception handling, stored procedures, functions, and database triggers.",
    weightageEstimate: "2-3 Questions"
  },

  // Subject 8: Object-Oriented Programming through C++ (6 topics)
  {
    id: "CSE-T45",
    topicNumber: 45,
    officialTopicName: "OOP concepts and classes in C++",
    logicalTopicName: "OOP Principles, Classes, and Objects in C++",
    subjectId: "CPP",
    subjectName: "OOP Through C++",
    syllabusDescription: "Paradigms of OOP (Encapsulation, Data Hiding, Abstraction), class definition, access specifiers (private, public, protected), and object creation.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T46",
    topicNumber: 46,
    officialTopicName: "Constructors and destructors",
    logicalTopicName: "Constructors, Destructors, and Memory Management",
    subjectId: "CPP",
    subjectName: "OOP Through C++",
    syllabusDescription: "Default constructors, parameterized constructors, copy constructors, destructor execution order, dynamic memory allocation with new and delete operators.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T47",
    topicNumber: 47,
    officialTopicName: "Function and operator overloading",
    logicalTopicName: "Operator and Function Overloading",
    subjectId: "CPP",
    subjectName: "OOP Through C++",
    syllabusDescription: "Compile-time polymorphism, function overloading rules, unary operator overloading, binary operator overloading, and overloading restrictions.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T48",
    topicNumber: 48,
    officialTopicName: "Inheritance in C++",
    logicalTopicName: "Inheritance Modes and Virtual Base Classes",
    subjectId: "CPP",
    subjectName: "OOP Through C++",
    syllabusDescription: "Single, multilevel, multiple, hierarchical, and hybrid inheritance; access control under public, protected, private inheritance; virtual base classes (diamond problem).",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T49",
    topicNumber: 49,
    officialTopicName: "Virtual functions and polymorphism",
    logicalTopicName: "Polymorphism, Virtual Functions, and Friend Functions",
    subjectId: "CPP",
    subjectName: "OOP Through C++",
    syllabusDescription: "Runtime polymorphism, virtual functions, late binding, vtable/vptr concept, pure virtual functions, abstract classes, friend functions, and the this pointer.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T50",
    topicNumber: 50,
    officialTopicName: "Templates, exceptions, and file streams",
    logicalTopicName: "C++ Templates, Exception Handling, and File Streams",
    subjectId: "CPP",
    subjectName: "OOP Through C++",
    syllabusDescription: "Function templates, class templates, exception handling mechanism (try, catch, throw), file streams (ifstream, ofstream, fstream), and I/O manipulators.",
    weightageEstimate: "1-2 Questions"
  },

  // Subject 9: Java Programming (6 topics)
  {
    id: "CSE-T51",
    topicNumber: 51,
    officialTopicName: "Java architecture and language basics",
    logicalTopicName: "Java Architecture, Bytecode, and Language Basics",
    subjectId: "JAVA",
    subjectName: "Java Programming",
    syllabusDescription: "JVM, JRE, JDK architecture, bytecode, platform independence, data types, variables, operators, selection statements, loops, and 1D/2D arrays.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T52",
    topicNumber: 52,
    officialTopicName: "Classes, inheritance, and polymorphism in Java",
    logicalTopicName: "Classes, Objects, and Inheritance in Java",
    subjectId: "JAVA",
    subjectName: "Java Programming",
    syllabusDescription: "Class definition, object creation, constructors, this and super keywords, single and multilevel inheritance, method overriding, dynamic method dispatch, and final keyword.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T53",
    topicNumber: 53,
    officialTopicName: "Interfaces and packages",
    logicalTopicName: "Interfaces, Packages, and Access Specifiers",
    subjectId: "JAVA",
    subjectName: "Java Programming",
    syllabusDescription: "Defining and implementing interfaces, multiple inheritance through interfaces, creating and importing user-defined packages, and Java access protection levels.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T54",
    topicNumber: 54,
    officialTopicName: "Exception handling in Java",
    logicalTopicName: "Exception Handling in Java",
    subjectId: "JAVA",
    subjectName: "Java Programming",
    syllabusDescription: "Throwable hierarchy, checked vs unchecked exceptions, try-catch blocks, nested try, finally block, throw keyword, throws clause, and custom exceptions.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T55",
    topicNumber: 55,
    officialTopicName: "Multithreading in Java",
    logicalTopicName: "Multithreading and Thread Synchronization in Java",
    subjectId: "JAVA",
    subjectName: "Java Programming",
    syllabusDescription: "Thread lifecycle, creating threads by extending Thread class and implementing Runnable interface, thread priorities, synchronization, and inter-thread communication.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T56",
    topicNumber: 56,
    officialTopicName: "Java Database Connectivity (JDBC)",
    logicalTopicName: "Java Database Connectivity (JDBC)",
    subjectId: "JAVA",
    subjectName: "Java Programming",
    syllabusDescription: "JDBC architecture, JDBC driver types (Type 1-4), DriverManager, Connection, Statement, PreparedStatement, ResultSet, and executing SQL queries from Java.",
    weightageEstimate: "1-2 Questions"
  },

  // Subject 10: Internet Programming (Web Technologies) (6 topics)
  {
    id: "CSE-T57",
    topicNumber: 57,
    officialTopicName: "HTML basics and page formatting",
    logicalTopicName: "HTML Basics, Elements, Forms, and Semantic Tags",
    subjectId: "WEB",
    subjectName: "Internet Programming",
    syllabusDescription: "HTML document structure, text formatting, headings, paragraphs, lists, hyperlinks, image tags, tables, forms, input elements, and HTML5 semantic tags.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T58",
    topicNumber: 58,
    officialTopicName: "CSS styling and layout",
    logicalTopicName: "CSS Styling, Box Model, and Page Layouts",
    subjectId: "WEB",
    subjectName: "Internet Programming",
    syllabusDescription: "Inline, internal, external CSS, CSS selectors, box model (margin, border, padding, content), color, font properties, float, and CSS layout fundamentals.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T59",
    topicNumber: 59,
    officialTopicName: "JavaScript language fundamentals",
    logicalTopicName: "JavaScript Language Basics and Control Structures",
    subjectId: "WEB",
    subjectName: "Internet Programming",
    syllabusDescription: "Client-side scripting role, variables (var, let, const), primitive data types, operators, conditional branching, loops, functions, and arrays in JavaScript.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T60",
    topicNumber: 60,
    officialTopicName: "DOM manipulation and events",
    logicalTopicName: "JavaScript DOM Manipulation and Event Handling",
    subjectId: "WEB",
    subjectName: "Internet Programming",
    syllabusDescription: "Document Object Model (DOM) tree, document methods (getElementById, querySelector), modifying elements/styles, event listeners (click, change, submit), and form validation.",
    weightageEstimate: "2 Questions"
  },
  {
    id: "CSE-T61",
    topicNumber: 61,
    officialTopicName: "PHP basics and control structures",
    logicalTopicName: "PHP Basics, Superglobals, and Server-Side Scripting",
    subjectId: "WEB",
    subjectName: "Internet Programming",
    syllabusDescription: "PHP server-side scripting model, syntax, variables, data types, echo/print, control structures, indexed and associative arrays, user-defined functions, and $_GET, $_POST superglobals.",
    weightageEstimate: "1-2 Questions"
  },
  {
    id: "CSE-T62",
    topicNumber: 62,
    officialTopicName: "PHP database connectivity and sessions",
    logicalTopicName: "PHP Database Connectivity and Session Management",
    subjectId: "WEB",
    subjectName: "Internet Programming",
    syllabusDescription: "Connecting PHP to MySQL database, executing SQL INSERT/SELECT queries, handling cookies (setcookie), and session management (session_start, $_SESSION).",
    weightageEstimate: "1-2 Questions"
  }
];

export const TOTAL_CSE_SUBJECTS = 10;
export const TOTAL_CSE_TOPICS = 62;
