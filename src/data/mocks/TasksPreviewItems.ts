/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { TasksPreviewItemContent } from 'presentation/components/dashboard/TasksPreview/types';

export const MOCK_TASKS_PREVIEW_ITEMS: TasksPreviewItemContent[] = [
  {
    status: 'ongoing',
    dueDate: {
      date: '2025-12-27T09:14:30+08:00',
      isToday: true,
      isOverdue: false,
    },
    assignee: [
      {
        assigneeId: 1,
        assigneeFirstName: 'Edward',
        assigneeLastName: 'Cabanilla',
        assigneeProfile:
          'https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/468399925_10227920419695477_1342367894245353717_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFMf1W5MCsTBjXqfvy1-ntvmP8NSZsotPiY_w1Jmyi0-BPcVne5VOdwykMukwrZO9dWgorR-S9SV6gEgtTr3YSX&_nc_ohc=qRKDCU60k_8Q7kNvwFL05LK&_nc_oc=Adkh05ASTj9b7R73aLuPtVIDsJjB5M9f0SPRyDFTDSBzp_92EXvLsU6lq3xZ4CSIJE8NxT4oucTU5wUzytURWCKf&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=KS08uQhqdZGXZB3XBWnJ5g&oh=00_AfleG2Ddmf4mrGYNuXYxpdLp75lHtw-iw5QZORBaa5EmpA&oe=69550FFD',
      },
      {
        assigneeId: 2,
        assigneeFirstName: 'Norman',
        assigneeLastName: 'Palisoc',
        assigneeProfile:
          'https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/472335645_8834361003359950_5627451374706270003_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGz38E4t9h1kmtoIkOdfOv9mBWQU-zPKgyYFZBT7M8qDJ5XCyVRBeWlcQSPVq2z2yMFCCIhAXKNIzlyK_zdeyBE&_nc_ohc=OeosJ_mnqQ4Q7kNvwEOajQD&_nc_oc=Adk0DRzvDJQJnKCjpYrjJB8e1gXCl-1bNZoBpnfgrAEk2MsyohuwOh6um7FN1T7fzC6xawpsREe0dZr68DEtjLd8&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=R1VG0oVpNjtvMWZMpG8iKA&oh=00_Afnk_tZdgTSffVKxzBvl2KRlUDLxkrzvbhkFeT6jdkLJpA&oe=6955277A',
      },
    ],
    taskId: 1,
    taskTitle: 'Setup Kitchenwares',
    taskDescription: 'Prepare needed kitchenwares such as pans, kitchen decks, etc.',
  },
  {
    status: 'not started',
    dueDate: {
      date: '2025-12-27T09:14:30+08:00',
      isToday: true,
      isOverdue: false,
    },
    assignee: [
      {
        assigneeId: 1,
        assigneeFirstName: 'Edward',
        assigneeLastName: 'Cabanilla',
        assigneeProfile:
          'https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/468399925_10227920419695477_1342367894245353717_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFMf1W5MCsTBjXqfvy1-ntvmP8NSZsotPiY_w1Jmyi0-BPcVne5VOdwykMukwrZO9dWgorR-S9SV6gEgtTr3YSX&_nc_ohc=qRKDCU60k_8Q7kNvwFL05LK&_nc_oc=Adkh05ASTj9b7R73aLuPtVIDsJjB5M9f0SPRyDFTDSBzp_92EXvLsU6lq3xZ4CSIJE8NxT4oucTU5wUzytURWCKf&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=KS08uQhqdZGXZB3XBWnJ5g&oh=00_AfleG2Ddmf4mrGYNuXYxpdLp75lHtw-iw5QZORBaa5EmpA&oe=69550FFD',
      },
      {
        assigneeId: 2,
        assigneeFirstName: 'Norman',
        assigneeLastName: 'Palisoc',
        assigneeProfile:
          'https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/472335645_8834361003359950_5627451374706270003_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGz38E4t9h1kmtoIkOdfOv9mBWQU-zPKgyYFZBT7M8qDJ5XCyVRBeWlcQSPVq2z2yMFCCIhAXKNIzlyK_zdeyBE&_nc_ohc=OeosJ_mnqQ4Q7kNvwEOajQD&_nc_oc=Adk0DRzvDJQJnKCjpYrjJB8e1gXCl-1bNZoBpnfgrAEk2MsyohuwOh6um7FN1T7fzC6xawpsREe0dZr68DEtjLd8&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=R1VG0oVpNjtvMWZMpG8iKA&oh=00_Afnk_tZdgTSffVKxzBvl2KRlUDLxkrzvbhkFeT6jdkLJpA&oe=6955277A',
      },
    ],
    taskId: 2,
    taskTitle: 'Setup Kitchenwares',
    taskDescription: 'Prepare needed kitchenwares such as pans, kitchen decks, etc.',
  },
  {
    status: 'not started',
    dueDate: {
      date: '2025-12-27T09:14:30+08:00',
      isToday: true,
      isOverdue: false,
    },
    assignee: [
      {
        assigneeId: 1,
        assigneeFirstName: 'Edward',
        assigneeLastName: 'Cabanilla',
        assigneeProfile:
          'https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/468399925_10227920419695477_1342367894245353717_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFMf1W5MCsTBjXqfvy1-ntvmP8NSZsotPiY_w1Jmyi0-BPcVne5VOdwykMukwrZO9dWgorR-S9SV6gEgtTr3YSX&_nc_ohc=qRKDCU60k_8Q7kNvwFL05LK&_nc_oc=Adkh05ASTj9b7R73aLuPtVIDsJjB5M9f0SPRyDFTDSBzp_92EXvLsU6lq3xZ4CSIJE8NxT4oucTU5wUzytURWCKf&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=KS08uQhqdZGXZB3XBWnJ5g&oh=00_AfleG2Ddmf4mrGYNuXYxpdLp75lHtw-iw5QZORBaa5EmpA&oe=69550FFD',
      },
      {
        assigneeId: 2,
        assigneeFirstName: 'Norman',
        assigneeLastName: 'Palisoc',
        assigneeProfile:
          'https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/472335645_8834361003359950_5627451374706270003_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGz38E4t9h1kmtoIkOdfOv9mBWQU-zPKgyYFZBT7M8qDJ5XCyVRBeWlcQSPVq2z2yMFCCIhAXKNIzlyK_zdeyBE&_nc_ohc=OeosJ_mnqQ4Q7kNvwEOajQD&_nc_oc=Adk0DRzvDJQJnKCjpYrjJB8e1gXCl-1bNZoBpnfgrAEk2MsyohuwOh6um7FN1T7fzC6xawpsREe0dZr68DEtjLd8&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=R1VG0oVpNjtvMWZMpG8iKA&oh=00_Afnk_tZdgTSffVKxzBvl2KRlUDLxkrzvbhkFeT6jdkLJpA&oe=6955277A',
      },
    ],
    taskId: 3,
    taskTitle: 'Setup Kitchenwares',
    taskDescription: 'Prepare needed kitchenwares such as pans, kitchen decks, etc.',
  },
  {
    status: 'not started',
    dueDate: {
      date: '2025-12-27T09:14:30+08:00',
      isToday: false,
      isOverdue: true,
    },
    assignee: [
      {
        assigneeId: 1,
        assigneeFirstName: 'Edward',
        assigneeLastName: 'Cabanilla',
        assigneeProfile:
          'https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/468399925_10227920419695477_1342367894245353717_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFMf1W5MCsTBjXqfvy1-ntvmP8NSZsotPiY_w1Jmyi0-BPcVne5VOdwykMukwrZO9dWgorR-S9SV6gEgtTr3YSX&_nc_ohc=qRKDCU60k_8Q7kNvwFL05LK&_nc_oc=Adkh05ASTj9b7R73aLuPtVIDsJjB5M9f0SPRyDFTDSBzp_92EXvLsU6lq3xZ4CSIJE8NxT4oucTU5wUzytURWCKf&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=KS08uQhqdZGXZB3XBWnJ5g&oh=00_AfleG2Ddmf4mrGYNuXYxpdLp75lHtw-iw5QZORBaa5EmpA&oe=69550FFD',
      },
      {
        assigneeId: 2,
        assigneeFirstName: 'Norman',
        assigneeLastName: 'Palisoc',
        assigneeProfile:
          'https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/472335645_8834361003359950_5627451374706270003_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGz38E4t9h1kmtoIkOdfOv9mBWQU-zPKgyYFZBT7M8qDJ5XCyVRBeWlcQSPVq2z2yMFCCIhAXKNIzlyK_zdeyBE&_nc_ohc=OeosJ_mnqQ4Q7kNvwEOajQD&_nc_oc=Adk0DRzvDJQJnKCjpYrjJB8e1gXCl-1bNZoBpnfgrAEk2MsyohuwOh6um7FN1T7fzC6xawpsREe0dZr68DEtjLd8&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=R1VG0oVpNjtvMWZMpG8iKA&oh=00_Afnk_tZdgTSffVKxzBvl2KRlUDLxkrzvbhkFeT6jdkLJpA&oe=6955277A',
      },
    ],
    taskId: 4,
    taskTitle: 'Setup Kitchenwares',
    taskDescription: 'Prepare needed kitchenwares such as pans, kitchen decks, etc.',
  },
  {
    status: 'completed',
    dueDate: {
      date: '2025-12-27T09:14:30+08:00',
      isToday: true,
      isOverdue: false,
    },
    assignee: [
      {
        assigneeId: 1,
        assigneeFirstName: 'Edward',
        assigneeLastName: 'Cabanilla',
        assigneeProfile:
          'https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/468399925_10227920419695477_1342367894245353717_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFMf1W5MCsTBjXqfvy1-ntvmP8NSZsotPiY_w1Jmyi0-BPcVne5VOdwykMukwrZO9dWgorR-S9SV6gEgtTr3YSX&_nc_ohc=qRKDCU60k_8Q7kNvwFL05LK&_nc_oc=Adkh05ASTj9b7R73aLuPtVIDsJjB5M9f0SPRyDFTDSBzp_92EXvLsU6lq3xZ4CSIJE8NxT4oucTU5wUzytURWCKf&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=KS08uQhqdZGXZB3XBWnJ5g&oh=00_AfleG2Ddmf4mrGYNuXYxpdLp75lHtw-iw5QZORBaa5EmpA&oe=69550FFD',
      },
      {
        assigneeId: 2,
        assigneeFirstName: 'Norman',
        assigneeLastName: 'Palisoc',
        assigneeProfile:
          'https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/472335645_8834361003359950_5627451374706270003_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGz38E4t9h1kmtoIkOdfOv9mBWQU-zPKgyYFZBT7M8qDJ5XCyVRBeWlcQSPVq2z2yMFCCIhAXKNIzlyK_zdeyBE&_nc_ohc=OeosJ_mnqQ4Q7kNvwEOajQD&_nc_oc=Adk0DRzvDJQJnKCjpYrjJB8e1gXCl-1bNZoBpnfgrAEk2MsyohuwOh6um7FN1T7fzC6xawpsREe0dZr68DEtjLd8&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=R1VG0oVpNjtvMWZMpG8iKA&oh=00_Afnk_tZdgTSffVKxzBvl2KRlUDLxkrzvbhkFeT6jdkLJpA&oe=6955277A',
      },
    ],
    taskId: 5,
    taskTitle: 'Setup Kitchenwares',
    taskDescription: 'Prepare needed kitchenwares such as pans, kitchen decks, etc.',
  },
];
