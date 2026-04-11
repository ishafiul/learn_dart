# Choose the right approach

| If you want…                                               | Do this                                                                                            |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Flutter app dev                                            | Install Flutter → you automatically get the Dart SDK and the `dart` CLI (it ships inside Flutter). |
| CLI/server Dart only (no Flutter)                          | Install Dart SDK standalone via package manager.                                                   |
| Per-project Flutter versions                               | Use FVM (best DX for Flutter teams).                                                               |
| One tool to manage everything (node, java, dart, flutter…) | Use asdf (great for polyglot dev machines).                                                        |

---

# 1) Install Dart with Flutter (macOS / Windows / Linux)

## What you get

Once Flutter is installed and its `bin` is on PATH, you can run:

```bash
flutter doctor
dart --version
```

Flutter bundles Dart, so you usually don't install Dart separately.

## macOS (Flutter manual install)

Create a place to keep SDKs (recommended):

```bash
mkdir -p ~/develop
```

Download the macOS Flutter zip (Apple Silicon vs Intel) from Flutter docs, then extract:

```bash
unzip ~/Downloads/flutter_macos_XXX-stable.zip -d ~/develop/
```

Add Flutter to your PATH (zsh default on modern macOS):

```bash
echo 'export PATH="$PATH:$HOME/develop/flutter/bin"' >> ~/.zshrc
source ~/.zshrc
```

Verify:

```bash
flutter --version
dart --version
flutter doctor
```

## Windows (Flutter manual install)

1. Create a folder (e.g. `C:\Users\<you>\develop`).
2. Extract the zip using PowerShell:

```powershell
Expand-Archive -Path <sdk_zip_path> -Destination <destination_directory_path>
```

3. Add `...\flutter\bin` to PATH (Flutter docs: "Add Flutter to your PATH").
4. Verify in a new terminal:

```powershell
flutter --version
dart --version
flutter doctor
```

## Linux (Flutter manual install)

Install prerequisites:

```bash
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
```

Download Flutter SDK bundle and extract (Linux uses `tar -xf` per docs).

Add Flutter bin to PATH (example):

```bash
echo 'export PATH="$PATH:$HOME/develop/flutter/bin"' >> ~/.bashrc
source ~/.bashrc
```

Verify:

```bash
flutter --version
dart --version
flutter doctor
```

---

# 2) Install Dart SDK standalone (no Flutter)

Official Dart docs recommend package managers and provide the exact commands below.

## macOS (Homebrew)

```bash
brew tap dart-lang/dart
brew install dart
dart --version
```

Upgrade:

```bash
brew upgrade dart
```

## Windows (Chocolatey)

Open PowerShell as Administrator, then:

```powershell
choco install dart-sdk
dart --version
```

Upgrade:

```powershell
choco upgrade dart-sdk
```

## Linux (Ubuntu/Debian via apt repo)

First-time setup (key + repo):

```bash
sudo apt-get update && sudo apt-get install apt-transport-https

wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub \
  | sudo gpg --dearmor -o /usr/share/keyrings/dart.gpg

echo 'deb [signed-by=/usr/share/keyrings/dart.gpg arch=amd64] https://storage.googleapis.com/download.dartlang.org/linux/debian stable main' \
  | sudo tee /etc/apt/sources.list.d/dart_stable.list

sudo apt-get update && sudo apt-get install dart
dart --version
```

---

# 3) Install + use FVM (Flutter Version Management)

## When to use

- Different Flutter versions per project
- Consistent builds across machines

FVM install options include a script or Homebrew.

## Install FVM

**macOS (Homebrew):**

```bash
brew tap leoafarias/fvm
brew install fvm
```

**Any OS (install script):**

```bash
curl -fsSL https://fvm.app/install.sh | bash
```

## Use FVM in a Flutter project

From your Flutter project folder:

```bash
fvm use stable --pin
```

This creates `.fvm` / `.fvmrc` and pins the version.

Run Flutter/Dart through FVM (recommended):

```bash
fvm flutter doctor
fvm dart --version
```

---

# 4) Install + use asdf (for Dart + Flutter)

## When to use

- One version manager for everything
- `.tool-versions` per project

asdf’s official guide: install asdf → add plugin → install version → set version via `.tool-versions`.

## A) asdf + Dart

```bash
asdf plugin add dart
asdf install dart latest
asdf set -u dart <version>
```

Verify:

```bash
dart --version
asdf where dart
```

VS Code tip: the Dart plugin’s repo explains you can locate SDK via `asdf where dart` and configure editor paths.

## B) asdf + Flutter (includes both Flutter and Dart)

The community Flutter plugin includes Flutter and Dart. `jq` is required.

```bash
asdf plugin add flutter
asdf install flutter <version>
asdf set -u flutter <version>
```

VS Code troubleshooting (if it can’t find Flutter):

```bash
export FLUTTER_ROOT="$(asdf where flutter)"
```

---

# 5) Quick verification checklist (any setup)

Run these and make sure each works:

```bash
dart --version
flutter --version
flutter doctor
```

If something fails, it’s usually PATH. Flutter docs explicitly call out adding Flutter’s `bin` directory to PATH so both `flutter` and `dart` commands work.

If you tell me your OS (macOS Intel vs Apple Silicon, Windows, Ubuntu, etc.) and whether you’re doing Flutter or Dart-only, I’ll give you a “copy-paste exact” setup for your machine (including the correct shell file: `.zshrc` vs `.bashrc`, PATH, and verification).
