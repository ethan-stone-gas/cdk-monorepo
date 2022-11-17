# What is this?

This is a working demo of using using cdk with a monorepo and with one of the services being build with docker.

## Core Ideas

There are two core ideas demonstrated in this demo

The very first thing taken into consideration is how the code should be organized. The 3 types of code we write
is source code, shared packages code (also source code), and infrastructure code. So the code is organized with
infrastructure code at the root and written inside infra, and all source code are npm workspaces/packages.

The second idea is to split up source code more granularly. This is an idea taken from external api. Just because a
service is using containers and functions doesn't mean they have to be organized in the same place. To me it makes sense
to put functions and containers under two complete workspaces/packages because they are built/bundled in completely
different ways, so separately them makes it easier to manage them.
